---
title: 'Codingame puzzle walkthough: Turn here'
description: 'My implementation for the codingame puzzle: Turn here in golang'
pubDate: 2024-09-13
tags: ["go"]
---
Here's [the puzzle link](https://www.codingame.com/ide/puzzle/create-turn-here-signs)!

## Parsing 

Nothing to comment on the parsing here, but we can see the start of the algo, I'm already storing one complete line with the correct width, spacing and arrows count.

```go
	var dir string
    var count, height, width, space, indent int

    fmt.Scanf("%s %d %d %d %d %d", &dir, &count, &height, &width, &space, &indent)

	line := ""
    c := ">"
    if dir == "left" {
        c = "<"
    }
    line = strings.TrimRight(strings.Repeat(strings.Repeat(c, width) + strings.Repeat(" ", space), count), " ")

```

## The Search

And with the line prepared, the next step is to simply print it as many time as needed.
We only have to adjust the indentation.
We start at 0 or at the max depending on the arrow direction, and then we increase or decreaste it accordingly! Easy!

```go
	currentIndent := 0
	if dir == "left" {
		currentIndent = int(math.Floor(float64(height / 2))) * indent
	}
	for j := 0; j < height; j++ {
        fmt.Print(strings.Repeat(" ", currentIndent))
		halfPoint := j < height/2
		if (dir == "right" && halfPoint) || (dir == "left" && !halfPoint) {
			currentIndent += indent
		} else {
			currentIndent -= indent
		}
		fmt.Println(line)
	}
```

## Complete solution

If you have any questions or suggestions, send me a message at `me@krayorn.com` or a DM on [Twitter/X](https://x.com/Krayorn)

```go
package main

import (
	"fmt"
	"math"
	"strings"
)

func main() {
	var dir string
    var count, height, width, space, indent int

    fmt.Scanf("%s %d %d %d %d %d", &dir, &count, &height, &width, &space, &indent)

	line := ""
    c := ">"
    if dir == "left" {
        c = "<"
    }
    line = strings.TrimRight(strings.Repeat(strings.Repeat(c, width) + strings.Repeat(" ", space), count), " ")

	currentIndent := 0
	if dir == "left" {
		currentIndent = int(math.Floor(float64(height / 2))) * indent
	}
	for j := 0; j < height; j++ {
        fmt.Print(strings.Repeat(" ", currentIndent))
		halfPoint := j < height/2
		if (dir == "right" && halfPoint) || (dir == "left" && !halfPoint) {
			currentIndent += indent
		} else {
			currentIndent -= indent
		}
		fmt.Println(line)
	}
}
```