---
title: 'Codingame puzzle walkthough: Moves in a maze'
description: 'My implementation for the codingame puzzle: Moves in a maze in golang'
pubDate: 2024-09-06
tags: ["go"]
---

First, [the puzzle link](https://www.codingame.com/ide/puzzle/moves-in-maze) if you didn't complete it already, I encourage you to finish it first! 

## Parsing 

First step, parsing the input. 
I store the width, the height and make the grid.

When I find the `S` indicating the Start, I replace it with a `0` (for the distance) and save this location in a queue.

We'll use the queue like in a Breadth-First Search to find the shortest path.

```go
	var w, h int
	scanner.Scan()
	fmt.Sscan(scanner.Text(), &w, &h)

	grid := make([][]string, h)
	queue := make([][]int, 1)

	for i := 0; i < h; i++ {
		row := make([]stringg, w)
		scanner.Scan()
		txt := scanner.Text()
		for j, c := range strings.Split(txt, "") {
			if c == "S" {
				queue[0] = []int{i, j}
				row[j] = "0"
				continue
			}
			row[j] = c
		}
		grid[i] = row
	}
```

## The Search

Now for the actual algo. 

For each item in the queue:
- check if this cell was already visited
- check the four neighbours (the maze being periodic, if we go out one way, we come back on the other side if there is no wall)
- check that the neigbour cell was not already reached from another cell
- set the distance for the neighbour cell, which is current cell distance + 1
- add the neigbour cell to the queue 

```go
	visited := make(map[string]bool)
	directions := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for len(queue) > 0 {
		item := queue[0]
		queue = queue[1:]

		if _, ok := visited[fmt.Sprintf("%s-%s", strconv.Itoa(item[0]), strconv.Itoa(item[1]))]; ok {
			continue
		}
		visited[fmt.Sprintf("%s-%s", strconv.Itoa(item[0]), strconv.Itoa(item[1]))] = true

		val, _ := strconv.Atoi(grid[item[0]][item[1]])
		for _, dir := range directions {
			newI := (item[0] + h + dir[0]) % h
			newJ := (item[1] + w + dir[1]) % w

			if grid[newI][newJ] == "." {
				grid[newI][newJ] = strconv.Itoa(val + 1)
				queue = append(queue, []int{newI, newJ})
			}
		}
	}
```

At first I had 4 `if` `else`s to handle the exploration, I replaced them by the `directions` array.

The periodicity of the maze is handled by this line `newI := (item[0] + h + dir[0]) % h`.

## Output

To output the maze filled, we iterate through it, and if the cell is a number above 9, we convert it to a letter.

The letter A correspond the the rune `65`. So `string(rune(55 + val))` makes sure that if val is 10, `A` will be written.

```go
	for _, row := range grid {
		for _, c := range row {
			val, err := strconv.Atoi(c)
			if err != nil || val <= 9 {
				fmt.Print(c)
				continue
			}
			fmt.Print(string(rune(55 + val)))
		}
		fmt.Println()
	}
```


## Complete solution

If you have any questions or suggestions, send me a message at `me@krayorn.com` or a DM on [Twitter/X](https://x.com/Krayorn)

```
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Buffer(make([]byte, 1000000), 1000000)

	var w, h int
	scanner.Scan()
	fmt.Sscan(scanner.Text(), &w, &h)

	grid := make([][]string, h)
	queue := make([][]int, 1)

	for i := 0; i < h; i++ {
		row := make([]string, w)
		scanner.Scan()
		txt := scanner.Text()
		for j, c := range strings.Split(txt, "") {
			if c == "S" {
				queue[0] = []int{i, j}
				row[j] = "0"
				continue
			}
			row[j] = c
		}
		grid[i] = row
	}

	visited := make(map[string]bool)
	directions := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	for len(queue) > 0 {
		item := queue[0]
		queue = queue[1:]

		if _, ok := visited[fmt.Sprintf("%s-%s", strconv.Itoa(item[0]), strconv.Itoa(item[1]))]; ok {
			continue
		}
		visited[fmt.Sprintf("%s-%s", strconv.Itoa(item[0]), strconv.Itoa(item[1]))] = true

		val, _ := strconv.Atoi(grid[item[0]][item[1]])
		for _, dir := range directions {
			newI := (item[0] + h + dir[0]) % h
			newJ := (item[1] + w + dir[1]) % w

			if grid[newI][newJ] == "." {
				grid[newI][newJ] = strconv.Itoa(val + 1)
				queue = append(queue, []int{newI, newJ})
			}
		}
	}

	for _, row := range grid {
		for _, c := range row {
			val, err := strconv.Atoi(c)
			if err != nil || val <= 9 {
				fmt.Print(c)
				continue
			}
			fmt.Print(string(rune(55 + val)))
		}
		fmt.Println()
	}
}
```