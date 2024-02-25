---
layout: ../layouts/MarkdownPostLayout.astro
title: 'Cassidoo Interview question of the week'
pubDate: 2024-01-25
published: true
description: 'My answers to the inteview questions from Cassidoo newsletter.'
tags: []
---

You can find here my submissions to the Interview questions of the week from [Cassidoo newsletter](https://cassidoo.co/newsletter/) ! 

## 19-02-2023

> Given a string array, find the maximum product of word lengths where the words don't share any letters.

(Given the example and how late I was to send this, I assumed we were looking only for the bigger product between two words)

```js

// Example:
// > wordLengthProduct(["fish","fear","boo","egg","cake","abcdef"])
// > 16 // "fish" and "cake"

// > wordLengthProduct(["a","aa","aaa","aaaa"])
// > 0 // all of them share "a"

function wordLengthProduct(words) {
    let product = 0
    words.forEach((wordA) => {
        words.forEach((wordB) => {
            if (wordA === wordB) {
                return
            }

            if (!shareSomeLetter(wordA, wordB)) {
                const potentialProduct = wordA.length * wordB.length
                if (potentialProduct > product) {
                    product = potentialProduct
                }
            }
        })
    })

    return product
}

function shareSomeLetter(a, b) {
    if (b.length > a.length) {
        return shareSomeLetter(b, a)
    }

    for (let i = 0; i < a.length; i++) {
        if (b.includes(a[i])) {
            return true
        }
    }

    return false
}

console.log(wordLengthProduct(["fish","fear","boo","egg","cake","abcdef"])) // 16
console.log(wordLengthProduct(["a","aa","aaa","aaaa"])) // 0

```

## 12-02-2023

> Write a function that produces a generator that produces values in a range.

```go
package main

import "fmt"
import "errors"

func main() {
	generator := fromTo(0, 3)
	
	fmt.Println(generator()) // 0 <nil>
	fmt.Println(generator()) // 1 <nil>
	fmt.Println(generator()) // 2 <nil>
	fmt.Println(generator()) // -1 Generator expired
}

func fromTo(from int, to int) func() (int, error)  {
	current := from
    return func() (int, error) {
        if current < to {
            current++
            return current - 1, nil
        }
        return -1, errors.New("Generator expired")
    }
}
```


## 29-01-2024

> Write a function called daysBetween that takes in two dates, and returns the number of days between those dates 


```js
function daysBetween(d1, d2) {
    d1ms = new Date(d1).getTime()
    d2ms = new Date(d2).getTime()
    
    return Math.abs(Math.round((d1ms-d2ms)/(1000*60*60*24))); 
}

console.log(daysBetween('Jan 1, 2024', 'Jan 29, 2024')) // 28
console.log(daysBetween('Feb 29, 2020', 'Oct 31, 2023')) // 1340

```

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