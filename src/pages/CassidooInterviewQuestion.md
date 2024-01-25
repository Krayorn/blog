---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Cassidoo Interview question of the week'
pubDate: 2024-01-25
published: true
description: 'My answers to the inteview questions from Cassidoo newsletter.'
tags: []
---

You can find here my submissions to the Interview questions of the week from [Cassidoo newsletter](https://cassidoo.co/newsletter/) ! 

## 22-01-2024

> Write a data structure for a simple binary tree, and a function that prints a given tree.

This one took a bit more time, it works, but is not as simple as I'd have hoped. 

```go
package main

import "fmt"
import "math"
import "strings"

type Node struct {
	Name string
	Left *Node
	Right *Node
}

func main() {
	root := Node{Name: "1"}
	root.Left = &Node{Name: "2"}
	root.Right = &Node{Name: "3"}
	root.Left.Left = &Node{Name: "4"}
	root.Left.Right = &Node{Name: "5"}
	root.Left.Right.Left = &Node{Name: "6"}
	root.Left.Right.Right = &Node{Name: "7"}

	printTree(root)
}

/* Output:
            1
      /            \
      2            3
   /      \
   4      5
         /  \
         6  7
*/

func getSize(root Node) int {
	if root.Left == nil && root.Right == nil { 
		return 1;
	}
	
	if root.Left == nil {
		return 1 + getSize(*root.Right)
	}

	if root.Right == nil {
		return 1 + getSize(*root.Left)
	}

	return 1 + int(math.Max(float64(getSize(*root.Left)), float64(getSize(*root.Right))))
}

func printTree(root Node) {
	size := getSize(root)

	explo := []*Node{&root}
	for i := 1; i <= size; i++{
		links := ""
		nodeNames := ""
		next := make([]*Node, 0)
		for k, node := range explo {
			nodeSize := int(math.Pow(2, float64(size - i)) * 3)
			if node == nil {
				nodeNames += strings.Repeat(" ", int(math.Floor(float64(nodeSize))) + 1)
				links += strings.Repeat(" ", int(math.Floor(float64(nodeSize))) + 1)
				next = append(next, nil, nil)
				continue
			}

			nodeNames += strings.Repeat(" ", int(math.Floor(float64(nodeSize / 2))))
			links += strings.Repeat(" ", int(math.Floor(float64(nodeSize / 2))))

			if k % 2 == 0 {
				links += "/"
			} else {
				links += "\\"
			}
			nodeNames += node.Name

			nodeNames += strings.Repeat(" ", int(math.Ceil(float64(nodeSize / 2))))
			links += strings.Repeat(" ", int(math.Ceil(float64(nodeSize / 2))))

			next = append(next, node.Left, node.Right)
		}
		if i != 1 {
			fmt.Println(links)
		}
		fmt.Println(nodeNames)
		explo = next
	}
}
```

## 15-01-2024

> Given a 2D array, write a function that flips it vertically or horizontally.

First time seeing these questions, wrote this simple working solution !

```js
const array = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

function flip (flipper, direction) {
    if (direction === 'vertical') {
        return flipper.toReversed()
    }
    
    return flipper.map(row => row.toReversed())
}

console.log(flip(array, 'horizontal'))
//[[3,2,1],[6,5,4],[9,8,7]]

console.log(flip(array, 'vertical'))
//[[7,8,9],[4,5,6],[1,2,3]]
```