---
title: 'Codingame puzzle walkthough: abcdefghijklmnopqrstuvwxyz'
description: 'My implementation for the codingame puzzle: abcdefghijklmnopqrstuvwxyz in golang'
pubDate: 2024-09-11
tags: ["go"]
---

Find the puzzle on Codingame: [Puzzle link](https://www.codingame.com/ide/puzzle/abcdefghijklmnopqrstuvwxyz).

## Parsing 

Classic puzzle start, store the input in a grid! 
I'm also saving the locations of all the `a` to know where to start the searches later on.

```go
	grid := make([][]string, n)
	starts := make([]Coord, 0)

	for i := 0; i < n; i++ {
		var m string
		fmt.Scan(&m)
		row := make([]string, len(m))
		for j, val := range strings.Split(m, "") {
			row[j] = val
			if val == "a" {
				starts = append(starts, Coord{i, j})
			}
		}
		grid[i] = row
	}
```

## Checking for a loop

Then for each position in the starts array, we can try to do a solve.
A solve only stops when we find arrive on a `z`. 

We go in each direction around the location, and if we find the letter after the one we're in currently, we launch a new solve in this location.

We're also saving the path we're taking to simplify the output.


```go
for _, val := range starts {
    match, path := solve(grid, val, []Coord{})
    // [...]
}

func solve(grid [][]string, start Coord, path []Coord) (bool, []Coord) {
	path = append(path, Coord{start.X, start.Y})
	if grid[start.X][start.Y] == "z" {
		return true, path
	}
	
	target := string(grid[start.X][start.Y][0] + 1)
	directions := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	for _, direction := range directions {
		newX, newY := start.X  + direction[0], start.Y  + direction[1]

		if newX >= 0 && newX < len(grid) && newY >= 0 && newY < len(grid[0]) && grid[newX][newY] == target {
			match, newPath := solve(grid, Coord{newX, newY}, path)
			if match {
				return true, newPath
			}
		}
	}

	return false, path
}
```

## Output

When we finally find the loop, we iterate through the grid a last time, and for each position we check if it's the path that represent the loops. If it is, we print it correctly. If it isn't, we print `-`.

And that's it!

```go
	for _, val := range starts {
		match, path := solve(grid, val, []Coord{})
		if match {
			for i := range grid {
			CELL:
				for j := range grid[i] {
					for _, pos := range path {
						if pos.X == i && pos.Y == j {
							fmt.Print(grid[pos.X][pos.Y])
							continue CELL
						}
					}
					fmt.Print("-")
				}
				fmt.Println()
			}
			break
		}
	}
```

## Complete solution

If you have any questions or suggestions, send me a message at `me@krayorn.com` or a DM on [Twitter/X](https://x.com/Krayorn)

```go
package main

import (
	"fmt"
	"strings"
)

type Coord struct {X, Y int}

func main() {
	var n int
	fmt.Scan(&n)

	grid := make([][]string, n)
	starts := make([]Coord, 0)

	for i := 0; i < n; i++ {
		var m string
		fmt.Scan(&m)
		row := make([]string, len(m))
		for j, val := range strings.Split(m, "") {
			row[j] = val
			if val == "a" {
				starts = append(starts, Coord{i, j})
			}
		}
		grid[i] = row
	}

	for _, val := range starts {
		match, path := solve(grid, val, []Coord{})
		if match {
			for i := range grid {
			CELL:
				for j := range grid[i] {
					for _, pos := range path {
						if pos.X == i && pos.Y == j {
							fmt.Print(grid[pos.X][pos.Y])
							continue CELL
						}
					}
					fmt.Print("-")
				}
				fmt.Println()
			}
			break
		}
	}
}

func solve(grid [][]string, start Coord, path []Coord) (bool, []Coord) {
	path = append(path, Coord{start.X, start.Y})
	if grid[start.X][start.Y] == "z" {
		return true, path
	}
	
	target := string(grid[start.X][start.Y][0] + 1)
	directions := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	for _, direction := range directions {
		newX, newY := start.X  + direction[0], start.Y  + direction[1]

		if newX >= 0 && newX < len(grid) && newY >= 0 && newY < len(grid[0]) && grid[newX][newY] == target {
			match, newPath := solve(grid, Coord{newX, newY}, path)
			if match {
				return true, newPath
			}
		}
	}

	return false, path
}
```