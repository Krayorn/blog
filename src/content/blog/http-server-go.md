---
title: 'An HTTP Server in Go From scratch'
description: 'Follow along while I write an HTTPServer in Go From scratch following a codecrafters challenge.'
pubDate: 2024-08-07
tags: ["go", "software"]
---

I finished the [Coder Crafters](https://codecrafters.io/) course "Build your own HTTP server" in Golang.

In this post, we'll go over the code necessary for the challenge, and we'll also take a look at the refactorization I made at the end to improve the DX.

The [git repository](https://github.com/Krayorn/codecrafters-http-server-go) is available if you want to look at the whole codebase.

### A few words on CodeCrafters

I did the challenge while it was free in July 2024. The platform runs a battery of tests after each commit, making sure that all previous steps are still working as expected which is quite helpful. 

They support quite a few programming languages, which is nice. However, in return, there are no good tricks or best practices in how to accomplish it with your language of choice. This is why I spent some time refactoring everything in the end.

It was a good experience and I'll look into some of their other challenges.


## The challenge

### Step 1: Binding to a port

The first step is straightforward, listen to a port, and accept a connection.

```go
import (
    "fmt"
    "net"
    "os"
)

func main() {
    fmt.Println("Logs from your program will appear here!")

    l, err := net.Listen("tcp", "0.0.0.0:4221")
    if err != nil {
        fmt.Println("Failed to bind to port 4221")
        os.Exit(1)
    }

    _, err = l.Accept()
    if err != nil {
        fmt.Println("Error accepting connection: ", err.Error())
        os.Exit(1)
    }
}
```

### Step 2: Respond with a 200

To respond with a 200 status code, I have to `Write` to the accepted connection following the HTTP Response format: 
 - a status line
 - some headers 
 - the response body

For this step, I'm only answering with the first item of this list.

```go
conn, err := l.Accept()
if err != nil {
    fmt.Println("Error accepting connection: ", err.Error())
    os.Exit(1)
}

conn.Write([]byte("HTTP/1.1 200 OK\r\n\r\n"))
```

### Step 3: Extract URL path

Next, I'm reading the request, which is similar to the HTTP response format: a request line instead of a status line, and a request body instead of a response body. I split it on `\r\n` to handle each part separately.

I can then split again the requestLine to extract the path. If it's `/` I return our 200. If not, a 404.

```go
// Not handling bigger payload for now
req := make([]byte, 4096)
conn.Read(req)

parts := strings.Split(string(req), "\r\n")

requestLineParts := strings.Split(parts[0], " ")
if requestLineParts[1] != "/" {
    conn.Write([]byte("HTTP/1.1 404 Not Found\r\n\r\n"))
    conn.Close()
}

conn.Write([]byte("HTTP/1.1 200 OK\r\n\r\n"))
conn.Close()
```

### Step 4: Respond with body

I'm adding a new route `/echo/{str}`. I first check that the path matches the route and make sure there are the correct numbers of parameters (1 in this case).

Then I write the content of the path parameter to the response body. For the first time, I'm also adding two headers: Content-Type && Content-Length.

Everything is hard-coded for now, I'll clean up a bit later.

```go
if requestLineParts[1] == "/" {
    conn.Write([]byte("HTTP/1.1 200 OK\r\n\r\n"))
    conn.Close()
} else if strings.HasPrefix(requestLineParts[1], "/echo") {
    uriParts := strings.Split(requestLineParts[1], "/")
    if len(uriParts) > 3 {
        conn.Write([]byte("HTTP/1.1 404 Not Found\r\n\r\n"))
        conn.Close()
    }

    content := uriParts[2]
    contentLength := len(uriParts[2])
    conn.Write([]byte(fmt.Sprintf("HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: %d\r\n\r\n%s", contentLength, content)))
    conn.Close()
} else {
    conn.Write([]byte("HTTP/1.1 404 Not Found\r\n\r\n"))
    conn.Close()
}
```

### Step 5: Read header

I'm reading the headers before checking the routes by looking into the request right after the request line.

```go
headers := make(map[string]string)

for i := 1; i < len(parts); i++ {
    headerParts := strings.Split(parts[i], ": ")
    if len(headerParts) >= 2 {
        headers[headerParts[0]] = strings.Join(headerParts[1:], "")
    }
}
```

I can then return the `User-Agent` header if the route matches.

```go
else if strings.HasPrefix(requestLineParts[1], "/user-agent") {
    content := headers["User-Agent"]
    contentLength := utf8.RuneCountInString((content))

    conn.Write([]byte(fmt.Sprintf("HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: %d\r\n\r\n%s", contentLength, content)))
    conn.Close()
}
```


### Step 6: Concurrent connections

To handle multiple connections, I can move the code accepting the connection into an infinite loop and the rest of the code into a function executed in a goroutine.

```go
for {
    conn, err := l.Accept()
    if err != nil {
        fmt.Println("Error accepting connection: ", err.Error())
        os.Exit(1)  
    }

    go listenReq(conn)
}
```

### Improvement One: Use a HTTPRequest struct

There is still some steps in the challenge, but I cleaned up a little bit by grouping all the data related to the request into an HTTPRequest struct.

```go
type HTTPRequest struct {
    Headers map[string]string
    Url     string
}

// In the listenReq() function

request := HTTPRequest{
    Url:     requestLineParts[1],
    Headers: headers,
}
```

This allows me to use `request.Url` instead of `requestLineParts[1]` and `request.Headers["User-Agent"]` instead of `headers["User-Agent"]`.


### Step 7: Return a file

Returning a file is very similar to the routes I already had, once the path parameter is extracted, I can check if the file exist and return a 404 if it does not.
If it does, I return the file content with a new Content-Type `application/octet-stream`.

```go
if strings.HasPrefix(request.Url, "/files") {
    uriParts := strings.Split(request.Url, "/")
    if len(uriParts) > 3 {
        conn.Write([]byte("HTTP/1.1 404 Not Found\r\n\r\n"))
        return
    }

    path := uriParts[2]
    if _, err := os.Stat(fmt.Sprintf("/%s/%s", tempDirectory, path)); errors.Is(err, os.ErrNotExist) {
        conn.Write([]byte("HTTP/1.1 404 Not Found\r\n\r\n"))
        return
    }

    content, _ := os.ReadFile(fmt.Sprintf("/%s/%s", tempDirectory, path))
    contentLength := utf8.RuneCountInString(string(content))
    conn.Write([]byte(fmt.Sprintf("HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: %d\r\n\r\n%s", contentLength, content)))
}
```

I've also removed every `conn.Close()` and instead wrote `defer conn.Close()` just after defining `conn`. This helps in making sure  I never forget to close the connection.

### Step 8: Read request body

For the final step of the main challenge, I must read the request body, I started by adding some fields to the `HTTPRequest` struct

```go
type HTTPRequest struct {
    Headers map[string]string
    Url     string
    Method  string
    Body    []byte
}

// in listenReq() function

parts := strings.Split(string(rawReq), "\r\n\r\n")
metaParts := strings.Split(parts[0], "\r\n")
requestLineParts := strings.Split(metaParts[0], " ")

headers := make(map[string]string)
for i := 1; i < len(metaParts); i++ {
    headerParts := strings.Split(metaParts[i], ": ")
    if len(headerParts) >= 2 {
        headers[headerParts[0]] = strings.Join(headerParts[1:], "")
    }
}

contentLength, err := strconv.Atoi(headers["Content-Length"])
if err != nil {
    fmt.Println("Could not convert content length to int, ignoring body")
    contentLength = 0
}

request := HTTPRequest{
    Url:     requestLineParts[1],
    Headers: headers,
    Method:  requestLineParts[0],
    Body:    []byte(parts[1][:contentLength]),
}

```

Then in the `file` route, I can check the Method and if it's a `POST`, create a file from the `request.Body` and return a 201.

```go
if request.Method == "GET" {
    if _, err := os.Stat(fmt.Sprintf("/%s/%s", tempDirectory, path)); errors.Is(err, os.ErrNotExist) {
        conn.Write([]byte("HTTP/1.1 404 Not Found\r\n\r\n"))
        return
    }

    content, _ := os.ReadFile(fmt.Sprintf("/%s/%s", tempDirectory, path))
    contentLength := utf8.RuneCountInString(string(content))
    conn.Write([]byte(fmt.Sprintf("HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: %d\r\n\r\n%s", contentLength, content)))
} else if request.Method == "POST" {
    os.WriteFile(fmt.Sprintf("/%s/%s", tempDirectory, path), request.Body, 0666)
    conn.Write([]byte("HTTP/1.1 201 Created\r\n\r\n"))
}
```

## Extension: HTTP Compression

I'm now reading the `Accept-Encoding` header, looking through each of the encodings accepted by the client, and when I find one the server support (gzip in our case), I use it to compress our response.

```go
if encodingsStr, ok := request.Headers["Accept-Encoding"]; ok {
    encodings := strings.Split(encodingsStr, ", ")
    for _, encoding := range encodings {
        if encoding == "gzip" {
            var b bytes.Buffer
            gz := gzip.NewWriter(&b)
            if _, err := gz.Write([]byte(content)); err != nil {
                log.Fatal(err)
            }
            gz.Close()
            contentLength := len(b.String())
            conn.Write([]byte(fmt.Sprintf("HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: %d\r\nContent-Encoding: %s\r\n\r\n%s", contentLength, encoding, b.String())))
            return
        }
    }
}
```

## The refactorization

This was it for the challenge. But as mentioned earlier, I refactorized it all to simulate better what it would be like if it was a package. It's far from optimal and usable, but there is plenty to learn already.

### Improvement two: Create an HTTPResponse struct

Similarly to what I did earlier with the `HTTPRequest` struct, I created an `HTTPResponse` one.

It contains the response headers, Status code, and Body.
To go with this, I created a `Write` method that can be called on an `HTTPResponse`.

This `Write` method uses the data from the fields of this struct and formats everything to the HTTP standard. I also added some constants for the StatusCodes, and a function to get the Status from the Code.

```go
type HTTPResponse struct {
    Headers map[string]string
    Code    int
    Body    []byte
}

const (
    StatusOK      = 200
    StatusCreated = 201

    StatusNotFound = 404
)

func StatusText(code int) string {
    switch code {
    case StatusOK:
        return "OK"
    case StatusCreated:
        return "Created"
    case StatusNotFound:
        return "Not Found"
    }

    return ""
}

func (response HTTPResponse) Write() []byte {
    str := fmt.Sprintf("HTTP/1.1 %d %s\r\n", response.Code, StatusText(response.Code))

    for header, value := range response.Headers {
        str += fmt.Sprintf("%s: %s\r\n", header, value)
    }

    if len(response.Body) > 0 {
        str += fmt.Sprintf("Content-Length: %d\r\n", len(response.Body))
    }

    str += "\r\n"

    if len(response.Body) > 0 {
        str += string(response.Body)
    }

    return []byte(str)
}
```

This is then used like this:
```go
response = HTTPResponse{
    Code:    StatusOK,
    Headers: map[string]string{"Content-Type": "text/plain", "Content-Encoding": encoding},
    Body:    encodedContent.Bytes(),
}

conn.Write(response.Write())
```

### Improvement three: Handle the encoding for every request

Instead of handling the encoding directly in the "routes" functions, I moved it to the `Write` method.

It's the same code as earlier, but now it's only modifying the `response.Body` && `response.Headers` when necessary and should work for every request that provides the correct headers.

```go
if encodingsStr, ok := request.Headers["Accept-Encoding"]; ok {
    encodings := strings.Split(encodingsStr, ", ")
    for _, encoding := range encodings {
        if encoding == "gzip" {
            var encodedContent bytes.Buffer
            gz := gzip.NewWriter(&encodedContent)
            if _, err := gz.Write(response.Body); err != nil {
                log.Fatal(err)
            }
            gz.Close()

            response.Headers["Content-Encoding"] = encoding
            response.Body = encodedContent.Bytes()
            break
        }
    }
}
```

### Improvement four: Create a Route struct

Next, I decoupled the declaration of the routes from the code to run in each of them. I created a `Route` struct to define each route, it requires a function that will receive the HTTPRequest and return an HTTPResponse, as well as the Method and Path that should trigger the function.

```go
type Route struct {
    Callback func(HTTPRequest) HTTPResponse
    Method   string
    Path     string
}

```

To go along with this change, I also modified the `HTTPRequest` struct and added an `URL` struct. This allows users to get the path parameters from their URLs.

```go
type HTTPRequest struct {
    Headers map[string]string
    Url     URL
    Method  string
    Body    []byte
}

type URL struct {
    Original   string
    Parameters map[string]string
}
```

The routes are then declared like this

```go
routes := make([]Route, 0)

routes = append(routes, Route{
    Callback: home,
    Method:   "GET",
    Path:     "/",
})

routes = append(routes, Route{
    Callback: echo,
    Method:   "GET",
    Path:     "/echo/{str}",
})

routes = append(routes, Route{
    Callback: createFile,
    Method:   "POST",
    Path:     "/files/{filename}",
})
```

I could then modify the `listenReq` function to find the matching route by searching through this array of `Route`.

```go
    uriParts := strings.Split(requestLineParts[1], "/")

ROUTELOOP:
    for _, route := range routes {
        if requestLineParts[0] != route.Method {
            continue
        }

        routeParts := strings.Split(route.Path, "/")

        parameters := make(map[string]string)
        if len(routeParts) != len(uriParts) {
            continue
        }

        for i := 0; i < len(routeParts); i++ {
            if strings.HasPrefix(routeParts[i], "{") && strings.HasSuffix(routeParts[i], "}") {
                parameters[routeParts[i][1:len(routeParts[i])-1]] = uriParts[i]
                continue
            }

            if routeParts[i] == uriParts[i] {
                continue
            }

            continue ROUTELOOP
        }

        request.Url.Parameters = parameters
        conn.Write(route.Callback(request).Write(request))
        return
    }
```

There is no more need to modify this function to add a route, I can create a function and add a `Route` to the initial array. This simplifies the usage of the HTTP Server and reduces the code necessary to use it.

```go
func echo(request HTTPRequest) HTTPResponse {
    content := request.Url.Parameters["str"]

    return HTTPResponse{
        Code:    StatusOK,
        Headers: map[string]string{"Content-Type": "text/plain"},
        Body:    []byte(content),
    }
}
```

### Improvement five: Create an addRoute function

To make it even simpler to register a route, I've added a function that abstracts the creation of the routes.

```go
func addRoute(routes *[]Route, path string, callback func(HTTPRequest) HTTPResponse, method string) {
    *routes = append(*routes, Route{
        Callback: callback,
        Method:   method,
        Path:     path,
    })
}
// in main()
routes := make([]Route, 0)

addRoute(&routes, "/", home, "GET")
addRoute(&routes, "/echo/{str}", echo, "GET")
addRoute(&routes, "/user-agent", userAgent, "GET")
addRoute(&routes, "/files/{filename}", getFile, "GET")
addRoute(&routes, "/files/{filename}", createFile, "POST")

```

### Improvement six: Add a server struct

There is still quite some code in the `main` function related to the server. I still need to define a `routes` array and have an infinite loop to handle the connection. To remove this complexity from the user I've added a `Server` struct.

```go
type Server struct {
    Routes []Route
}

func newServer() Server {
    return Server{Routes: make([]Route, 0)}
}

func (server Server) start() {
    l, err := net.Listen("tcp", "0.0.0.0:4221")
    if err != nil {
        fmt.Println("Failed to bind to port 4221")
        os.Exit(1)
    }

    for {
        conn, err := l.Accept()
        if err != nil {
            fmt.Println("Error accepting connection: ", err.Error())
            os.Exit(1)
        }

        go listenReq(conn, server.Routes)
    }
}
```

It's a simple struct, but I've updated the `addRoute` function into a method called on a `Server`. The infinite loop is now handled in a `Start` method.

Using it now looks like this:

```go
router := newServer()

router.addRoute("/", home, "GET")
router.addRoute("/echo/{str}", echo, "GET")
router.addRoute("/user-agent", userAgent, "GET")
router.addRoute("/files/{filename}", getFile, "GET")
router.addRoute("/files/{filename}", createFile, "POST")

router.start()
```

### Improvement seven: Move the code related to the Server in a package

I moved everything that was not in main() or a function used as a callback for a route inside a package called `server`.

I won't paste all the code here but you can find it on my [repository](https://github.com/Krayorn/codecrafters-http-server-go).


# The end

That's it for now! There are plenty of other improvements to do but I have a lot of other shiny things I want to try out. 

I might revisit this later in a part 2, and tackle a few things:

- Handle bigger request body
- Query parameters
- Read the request in a more optimized way instead of a series of `strings.Split` (Sorry if that hurt you)
- Allowing Subrouters
- Handling middlewares
- And whatever else sounds fun and interesting, send suggestions my way!