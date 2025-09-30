---
title: "An HTTP Server in Go from scratch: Part 2"
description: Follow along while I improve the HTTPServer I wrote from scratch in Go.
pubDate: 2025-03-21
tags: ["go", "software"]
---
Last year I wrote a [blog post](https://www.krayorn.com/posts/http-server-go/) explaining how I built my HTTP Server in Golang by following a [Coder Crafters](https://codecrafters.io/), I got some good feedback on it and improved the HTTP Server quite a bit, let's dive into the changes!

The [git repository](https://github.com/Krayorn/codecrafters-http-server-go) is still available if you want to look at the whole codebase.

### The first unit test

Let's start by adding a unit test, I was relying on the Codecrafters test suite but now I want to have some of my own unit tests.

This should mimic the first stage of the Codecrafters test suit:
```go
func TestServerStart(t *testing.T) {
	// Start the server
	router := server.NewServer()
	go router.Start()

	// Give the server a moment to start
	time.Sleep(100 * time.Millisecond) // Not the most robust, good enough to start

	// Try to connect to the server
	conn, err := net.Dial("tcp", "localhost:4221")
	if err != nil {
		t.Fatalf("Could not connect to server: %v", err)
	}
	defer conn.Close()

	t.Log("Successfully connected to the server")
}
```

## Fixing issues found by readers
### Headers should be case-insensitive and accept multiple values

A Reddit comment mentioned that headers should be case-insensitive, and that some of them could have multiple values. That means that my naive `Headers map[string]string` is not correct! 

After reading the Golang doc for the HTTP package, I ended up with this:
```go
type Header map[string][]string // this is now an array of strings

func (header Header) Get(key string) string {
	if values, ok := header[strings.ToUpper(key)]; ok && len(values) > 0 {
		return values[0] // get only returns the first value! To get all values, .Values() should be used
	}
	return ""
}

func (header Header) Set(key string, value string) {
	header[strings.ToUpper(key)] = []string{value} // I always use ToUpper when interacting with the headers
}

func (header Header) Add(key string, value string) {
	header[strings.ToUpper(key)] = append(header[strings.ToUpper(key)], value)
}
```
Instead of using `toUpper` I could have used `textproto.CanonicalMIMEHeaderKey(s)` but it felt like cheating a bit in this "from scratch" serie, and I did not want to implement it myself today!

I'm also adding a second test to check that I'm correctly parsing the request.
```go
func TestParseRequest(t *testing.T) {
	rawRequest := "GET /index.html HTTP/1.1\r\n" +
		"Host: www.example.com\r\n" +
		"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\r\n" +
		"Content-Length: 3\r\n" +
		"\r\n" +
		"abc"

	request, err := parseRequest([]byte(rawRequest))
	if err != nil {
		t.Errorf("Expected no error, got %s", err)
	}

	if request.Method != "GET" {
		t.Errorf("Expected method GET, got %s", request.Method)
	}

	if request.Url.Original != "/index.html" {
		t.Errorf("Expected path /index.html, got %s", request.Url.Original)
	}

	if request.Headers.Get("Host") != "www.example.com" {
		t.Errorf("Expected Host header www.example.com, got %s", request.Headers["Host"])
	}

	expectedUserAgent := "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
	if request.Headers.Get("User-Agent") != expectedUserAgent {
		t.Errorf("Expected User-Agent header %s, got %s", expectedUserAgent, request.Headers["User-Agent"])
	}

	if string(request.Body) != "abc" {
		t.Errorf("Expected body %s, got %s", "abc", string(request.Body))
	}
}
```

### Stream the response instead of sending it as a single string

The next comment mentions that I should allow responses to be a stream (so an io.Writer in go).
For the most part it's quite straightforward, and I can simply replace every instance of `str += "some string"` by `io.WriteString(w, "some string")`.

And pass the connection the the write method: `route.Callback(*request).Write(conn)`

### Handling bigger payloads
Do you recall this from last post ?
```go
// Not handling bigger payload for now
rawReq := make([]byte, 4096)
```

Well, it's time. 

```go
	rawReq := make([]byte, 0)
	for {
		// It's gonna hang if requestLength % 4096 == 0
		buffer := make([]byte, 4096)
		n, err := conn.Read(buffer)

		if n > 0 {
			rawReq = append(rawReq, buffer[:n]...)
		}

		if n < 4096 || err != nil {
			break
		}
	}
```

This is another very naive implementation, but it handle bigger payloads for now!
However it breaks if the payload is a multiple of 4096, because there may be nothing left to read, but the loop is still waiting

To fix this issue, I add:
```go
conn.SetReadDeadline(time.Now().Add(10 * time.Millisecond)) // ensure the connection is not hanging waiting for data for no reason
```

I'm pretty sure the correct implementation would be to start parsing the data until I find the content-length to know exactly how much more I should read, but that's good enough for now!
## New features from my list
### Middleware

Middlewares are cool, it's a simple concept but I wondered how hard it was to implement!

The Server now has an array of middlewares that can be added by the client
```go
type Server struct {
	Routes      []Route
	Middlewares []func(Handler) Handler
}

type Handler func(request HTTPRequest) HTTPResponse

func (server *Server) Use(middleware func(Handler) Handler) {
	server.Middlewares = append(server.Middlewares, middleware)
}
```

And in the `listenReq` function,  we create a chain starting from the method assigned to the route followed by all the middlewares in the reverse order of assignment. Once the chain is complete, we call the last function of the chain, which triggers the chain reaction, returning to the callback!
```go
nextRequest := route.Callback
for i := len(middlewares) - 1; i >= 0; i-- {
	nextRequest = middlewares[i](nextRequest)
}

err := nextRequest(*request).Write(conn)
fmt.Println("Error while writing the response", err)

```

The client code looks like this:
```go
func main() {
	router := server.NewServer()
	router.AddRoute("/", home, "GET")
	
	router.AddRoute("/echo/{str}", echo, "GET")
	router.Use(timingMiddleware)
	router.Use(loggingMiddleware)
	router.Start()

}

func loggingMiddleware(next server.Handler) server.Handler {
	return func(req server.HTTPRequest) server.HTTPResponse {
		fmt.Println("Receiving call on ", req.Url.Original)
		resp := next(req)
		fmt.Println("Received call on ", req.Url.Original)
		return resp
	}
}

func timingMiddleware(next server.Handler) server.Handler {
	return func(req server.HTTPRequest) server.HTTPResponse {
		start := time.Now()
		resp := next(req)
		duration := time.Since(start)
		fmt.Printf("%s %s - %d (%v)\n", req.Method, req.Url.Original, resp.Code, duration)
		return resp
	}
}
```
Such elegance! (Ok, I don't know if it's that elegant, but I was quite happy with it, the code was less complicated than I thought!)

### Query string parameters

Next step: Query parameters.

I extract these from the original URL just before trying to match the URI. 

Currently I store all of them as strings and let the user do the conversion if they expect something else.
```go
	uri, queryParamString, found := strings.Cut(request.Url.Original, "?")
	uriParts := strings.Split(uri, "/")[1:]
	queryParameters := make(map[string]string)
	if found {
		for _, parameter := range strings.Split(queryParamString, "&") {
			keyValue := strings.Split(parameter, "=")
			if len(keyValue) > 1 {
				queryParameters[keyValue[0]] = keyValue[1]
			} else {
				queryParameters[keyValue[0]] = "true"
			}
		}
	}
```

The demo app can then access them like this
```go
func echo(request server.HTTPRequest) server.HTTPResponse {
	content := request.Url.Parameters["str"]
	if val, ok := request.Url.QueryParameters["repeat"]; ok && val == "true" {
		content = strings.Repeat(content, 2)
	}

	headers := make(server.Header)
	headers.Set("Content-Type", "text/plain")
	return server.HTTPResponse{
		Code:    server.StatusOK,
		Headers: headers,
		Body:    []byte(content),
		Request: &request,
	}
}
```

### Subrouters

To improve the UX of declaring many routes and only assigning middlewares to a certain set of routes, let's add the subrouters functionality.

Our `Server` type accepts other `Server` as Subrouters, and I create them via the Subrouter method on a server.
```go
type Server struct {
	Routes      []Route
	SubRouters  []*Server
	Middlewares []func(Handler) Handler
	Prefix      string
}

func (server *Server) SubRouter(prefix string) *Server {
	subRouter := Server{
		Prefix: prefix,
	}

	server.SubRouters = append(server.SubRouters, &subRouter)

	return &subRouter
}
```

Next the matching, I kept the same code as before for checking the routes, but it's now in a separate function called `match`. 

If no route is found, this function will iterate through the different subrouters with a correct prefix and then call `match` again on them.
```go
func match(request HTTPRequest, uriParts []string, server Server) (func(HTTPRequest) HTTPResponse, map[string]string, []func(Handler) Handler) {

// The code matching the routes
// [...]

SUBROUTERS:
	for _, subrouter := range server.SubRouters {
		prefixParts := strings.Split(subrouter.Prefix, "/")[1:]

		parametersPrefix := make(map[string]string)
		for i := 0; i < len(prefixParts); i++ {
			if strings.HasPrefix(prefixParts[i], "{") && strings.HasSuffix(prefixParts[i], "}") {
				parametersPrefix[prefixParts[i][1:len(prefixParts[i])-1]] = uriParts[i]
				continue
			}

			if prefixParts[i] == uriParts[i] {
				continue
			}

			continue SUBROUTERS
		}

		res, parameters, middlewares := match(request, uriParts[len(prefixParts):], *subrouter)
		if res != nil {
			maps.Copy(parametersPrefix, parameters)
			return res, parametersPrefix, append(server.Middlewares, middlewares...) // We share the middlewares of the main router with its subroutes
		}
	}

	return nil, map[string]string{}, server.Middlewares
}
```

In the demo app, the client can now use the subrouters like this
```go
	router := server.NewServer()

	router.AddRoute("/", home, "GET")
	router.AddRoute("/echo/{str}", echo, "GET")
	router.AddRoute("/user-agent", userAgent, "GET")
	router.AddRoute("/files/{filename}", getFile, "GET")
	router.AddRoute("/files/{filename}", createFile, "POST")

	v2Router := router.SubRouter("/v2/{aa}")
	v2Router.AddRoute("/echo/{str}", echo, "GET")
	v2Router.Use(timingMiddleware)

	router.Use(loggingMiddleware)
	router.Start()
```
The middlewares of a router are shared with its subrouters.

## The end, again

And we're done with this set of improvements, 3 fixes and 3 new features!

I don't think I'll work on this in the near future unless there are some big mistakes I made or a really fun idea I want to try. 

As you can see, I did not write enough unit tests for all the old and new features which is a shame and something I should improve on, especially for this kind of learning project.

Although I don't think I'll write a part 3, I have two other learning projects built on top of a Codecrafters course that could deserve their own post, the grep and the shell, you can expect to see a writeup on one of those in the next few months.