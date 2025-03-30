---
title: 'Codingame puzzle walkthough: Island Escape'
description: 'My implementation for the codingame puzzle: Island Escape in golang'
pubDate: 2025-03-30
tags: ["go"]
---

Here's [the puzzle link](https://www.codingame.com/ide/puzzle/island-escape)!

## Problem 

From the center of an island with different evelations, find if it's possible to reach the ocean(elevation 0) by only accessing plot of land orthogonally connected to your current position with a difference of elevation of at most 1.

## Parsing 

I start by creating a map of the island with the different elevations:
```go
	island := make([][]int, N)
	for i := 0; i < N; i++ {
		scanner.Scan()
		row := make([]int, N)
		inputs = strings.Split(scanner.Text(), " ")
		for j := 0; j < N; j++ {
			elevation, _ := strconv.Atoi(inputs[j])
			row[j] = elevation
		}
		island[i] = row
	}
```


## Search

I'm setting up a queue to store the positions that are accessible, and a visited map to avoid unnecessary processing.

Then I check the four neighbors of each element of the queue and add them to the queue if they are on a valid elevation. As soon as I find the ocean (elevation 0), I stop the search.
```go
	queue := make([][]int, 0)
	queue = append(queue, []int{N / 2, N / 2})
	directions := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	visited := make(map[string]bool)
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		visited[fmt.Sprintf("%d-%d", current[0], current[1])] = true

		elevation := island[current[0]][current[1]]

		if elevation == 0 {
			return true
		}

		for _, dir := range directions {
			if _, ok := visited[fmt.Sprintf("%d-%d", current[0]+dir[0], current[1]+dir[1])]; ok {
				continue
			}

			neighbourElevation := island[current[0]+dir[0]][current[1]+dir[1]]
			if neighbourElevation == elevation || neighbourElevation == elevation-1 || neighbourElevation == elevation+1 {
				queue = append(queue, []int{current[0] + dir[0], current[1] + dir[1]})
			}
		}
	}

	return false
```


## Complete solution

If you have any questions or suggestions, send me a message at `me@krayorn.com` or a DM on [Twitter/X](https://x.com/Krayorn)

```go
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
	var inputs []string

	var N int
	scanner.Scan()
	fmt.Sscan(scanner.Text(), &N)

	island := make([][]int, N)
	for i := 0; i < N; i++ {
		scanner.Scan()
		row := make([]int, N)
		inputs = strings.Split(scanner.Text(), " ")
		for j := 0; j < N; j++ {
			elevation, _ := strconv.Atoi(inputs[j])
			row[j] = elevation
		}
		island[i] = row
	}

	queue := make([][]int, 0)
	queue = append(queue, []int{N / 2, N / 2})

	directions := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	visited := make(map[string]bool)

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		visited[fmt.Sprintf("%d-%d", current[0], current[1])] = true

		elevation := island[current[0]][current[1]]

		if elevation == 0 {
			fmt.Println("yes")
			return
		}

		for _, dir := range directions {
			if _, ok := visited[fmt.Sprintf("%d-%d", current[0]+dir[0], current[1]+dir[1])]; ok {
				continue
			}

			neighbourElevation := island[current[0]+dir[0]][current[1]+dir[1]]
			if neighbourElevation == elevation || neighbourElevation == elevation-1 || neighbourElevation == elevation+1 {
				queue = append(queue, []int{current[0] + dir[0], current[1] + dir[1]})
			}
		}
	}

	fmt.Println("no")
}
```