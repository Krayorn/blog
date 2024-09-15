---
title: 'Codingame puzzle walkthough: Equivalent Resistance, Circuit Building'
description: 'My implementation for the codingame puzzle: Equivalent Resistance, Circuit Building in golang'
pubDate: 2024-09-15
tags: ["go"]
---

Find the puzzle on Codingame: [Puzzle link](https://www.codingame.com/ide/puzzle/equivalent-resistance-circuit-building).

## Parsing 

The first step is to parse the input string and translate it into a more fitting datastructure, I picked a tree-like structure.
the `createNode` function is called each time you find an open and close symbol (`()` or `[]`).
It then creates a Node, removes the borders and check what's inside. 

If it's a Resistance add a node with a Res value, to the current node. If it's another set of symbol, call `createNode` instead.

```go
type Node struct {
	Series   bool
	Values []Node
	Res    string
}

// [...]
	circuit := scanner.Text()
	tree := createNode(circuit)
// [...]

func createNode(circuit string) Node {
	node := Node{Series: string(circuit[0]) == "("}
	circuit = circuit[1 : len(circuit)-1]
	firstOpening := -1
	count := 0
	
	tokens := strings.Split(strings.Trim(circuit, " "), " ")
	for i, char := range tokens {
		if char == "(" || char == "[" {
			if firstOpening == -1 {
				firstOpening = i
			}
			count++
		} else if char == ")" || char == "]" {
			count--
			if count == 0 {
				newNode := createNode(strings.Join(tokens[firstOpening : i+1], " "))
				node.Values = append(node.Values, newNode)
				firstOpening = -1
			}
			continue
		}

		if count == 0 {
			node.Values = append(node.Values, Node{Res: char})
		}
	}

	return node
}
```

We end up with a tree where each node tells us if the resistances are in series or in parallel, and with an array of all child nodes OR a resistance name.

## Calculate the output

Once the tree is done, we can call the second recursive function `tree.Output(res)`.
This function start at the root, and then iterate through all the child nodes.

For each of these childs, if it's a resistance it takes its value, if not it calls `Output` on the child.

Then uses the values detected to make the correct calculation depending on if the Resistance is in Series or in parallel.

```go
// Called with: fmt.Println(fmt.Sprintf("%.1f", tree.Output(res)))
func (node Node) Output(res map[string]float64) float64 {
	sum := 0.0
	for _, child := range node.Values {
		val := 0.0
		if child.Res != "" {
			val = res[child.Res]
		} else {
			val = child.Output(res)
		}

		if node.Series {
			sum += val
		} else {
			sum += 1 / val
		}

	}

	if node.Series {
		return sum
	} else {
		return 1 / (sum)
	}
}
```

## Complete solution

If you have any questions or suggestions, send me a message at `me@krayorn.com` or a DM on [Twitter/X](https://x.com/Krayorn)

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

type Node struct {
	Series   bool
	Values []Node
	Res    string
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Buffer(make([]byte, 1000000), 1000000)

	var N int
	scanner.Scan()
	fmt.Sscan(scanner.Text(), &N)

	res := make(map[string]float64)

	for i := 0; i < N; i++ {
		var name string
		var R int
		scanner.Scan()
		fmt.Sscan(scanner.Text(), &name, &R)
		res[name] = float64(R)
	}

	scanner.Scan()
	circuit := scanner.Text()

	tree := createNode(circuit)
	fmt.Println(fmt.Sprintf("%.1f", tree.Output(res)))
}

func (node Node) Output(res map[string]float64) float64 {
	sum := 0.0
	for _, child := range node.Values {
		val := 0.0
		if child.Res != "" {
			val = res[child.Res]
		} else {
			val = child.Output(res)
		}

		if node.Series {
			sum += val
		} else {
			sum += 1 / val
		}

	}

	if node.Series {
		return sum
	} else {
		return 1 / (sum)
	}
}

func createNode(circuit string) Node {
	node := Node{Series: string(circuit[0]) == "("}
	circuit = circuit[1 : len(circuit)-1]
	firstOpening := -1
	count := 0
	
	tokens := strings.Split(strings.Trim(circuit, " "), " ")
	for i, char := range tokens {
		if char == "(" || char == "[" {
			if firstOpening == -1 {
				firstOpening = i
			}
			count++
		} else if char == ")" || char == "]" {
			count--
			if count == 0 {
				newNode := createNode(strings.Join(tokens[firstOpening : i+1], " "))
				node.Values = append(node.Values, newNode)
				firstOpening = -1
			}
			continue
		}

		if count == 0 {
			node.Values = append(node.Values, Node{Res: char})
		}
	}

	return node
}
```