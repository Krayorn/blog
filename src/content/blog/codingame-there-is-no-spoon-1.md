---
title: 'Codingame puzzle walkthough: There is no spoon - Episode 1'
description: 'My implementation for the codingame puzzle: There is no spoon - Episode 1 in golang'
pubDate: 2025-04-13
tags: ["go"]
---

Here's [the puzzle link](https://www.codingame.com/ide/puzzle/there-is-no-spoon-episode-1)!

## Problem 

You receive a grid containing nodes (0) and empty spaces (1).
Then for each node, you output:
  - Its position in the grid
  - The position of the first node to its right
  - The position of the first node to its down

If you can't find another node the the right or bottom of a node, you output -1, -1 instead.

Yep, that's it. I don't know why the prompt was so complicated.

## Parsing 

I start by storing the input in a simple grid without modifications.

```go
    grid := make([][]string, 0)
    for i := 0; i < height; i++ {
        scanner.Scan()
        line := scanner.Text()
        row := strings.Split(line, "")
        grid = append(grid, row) 
    }
```


## Output

Then I'm searching through the grid, and for each node I search for another node to its right, and then to its bottom.

```go
    for i, row := range grid {
        for j, node := range row {
            if node == "." {
                continue
            }

            rightX, rightY, downX, downY := -1, -1, -1, -1
            for k := j +1; k < len(row);k++ {
                rightNode := row[k]
                if rightNode == "0" {
                    rightX, rightY = k, i
                    break
                }
            }

            for l := i+1; l < len(grid);l++ {
                downNode := grid[l][j]
                if downNode == "0" {
                    downX, downY = j, l
                    break
                }
            }

            fmt.Println(j, i, rightX, rightY, downX, downY)
        }
    }
```


## Complete solution

If you have any questions or suggestions, send me a message at `me@krayorn.com` or a DM on [Twitter/X](https://x.com/Krayorn)

```go
package main

import "fmt"
import "os"
import "bufio"
import "strings"

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    scanner.Buffer(make([]byte, 1000000), 1000000)

    var width int
    scanner.Scan()
    fmt.Sscan(scanner.Text(),&width)
    
    var height int
    scanner.Scan()
    fmt.Sscan(scanner.Text(),&height)
    

    grid := make([][]string, 0)
    for i := 0; i < height; i++ {
        scanner.Scan()
        line := scanner.Text()
        row := strings.Split(line, "")
        grid = append(grid, row) 
    }
    
    for i, row := range grid {
        for j, node := range row {
            if node == "." {
                continue
            }

            rightX, rightY, downX, downY := -1, -1, -1, -1
            for k := j +1; k < len(row);k++ {
                rightNode := row[k]
                if rightNode == "0" {
                    rightX, rightY = k, i
                    break
                }
            }

            for l := i+1; l < len(grid);l++ {
                downNode := grid[l][j]
                if downNode == "0" {
                    downX, downY = j, l
                    break
                }
            }

            fmt.Println(j, i, rightX, rightY, downX, downY)
        }
    }
}
```