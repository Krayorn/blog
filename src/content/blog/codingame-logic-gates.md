---
title: 'Codingame puzzle walkthough: Logic gates'
description: 'My implementation for the codingame puzzle: Logic gates in golang'
pubDate: 2024-09-07
tags: ["go"]
---

You can do this puzzle yourself on Codingame [Puzzle link](https://www.codingame.com/ide/puzzle/logic-gates)!

## Parsing 

For this puzzle, I can simply save the `inputSignal` in a map index by the `inputName`. This way I'll be able to get the signal when needed.

```go
	inputs := make(map[string]string)
	for i := 0; i < n; i++ {
		var inputName, inputSignal string
		fmt.Scan(&inputName, &inputSignal)
		inputs[inputName] = inputSignal
	}


	for i := 0; i < m; i++ {
		var outputName, _type, inputName1, inputName2 string
		fmt.Scan(&outputName, &_type, &inputName1, &inputName2)

		fmt.Print(outputName, " ")

		// Get the output signal!
		
		fmt.Println()
	}
```

## Getting the signal

For each of our output, we can iterate through the characters of its two input signals and compare them using the correct function depending on the type of the output.

Because I didn"t want to convert the "-" and "_" into 1 and 0, I wrote a small function for each logic gate that takes two character and outputs a boolean if the gate should be "ON". In golang there is binary operator that could have been used instead if I had 0s and 1s (for example, the AND function would have been `a & b`).


```go
	functions := make(map[string]func(byte, byte) bool)
	functions["AND"] = func(a, b byte) bool { return a == b && a == '-' }
	functions["OR"] = func(a, b byte) bool { return a == '-' || b == '-' }
	functions["XOR"] = func(a, b byte) bool { return a != b }
	functions["NAND"] = func(a, b byte) bool { return a != '-' || b != '-' }
	functions["NOR"] = func(a, b byte) bool { return a == b && a == '_' }
	functions["NXOR"] = func(a, b byte) bool { return a == b }

	//[...]

	for j := range inputs[inputName1] {
		if functions[_type](inputs[inputName1][j], inputs[inputName2][j]) {
			fmt.Print("-")
		} else {
			fmt.Print("_")
		}
	}
```

## Complete solution

If you have any questions or suggestions, send me a message at `me@krayorn.com` or a DM on [Twitter/X](https://x.com/Krayorn)

```go
package main

import "fmt"

func main() {
	var n int
	fmt.Scan(&n)

	var m int
	fmt.Scan(&m)

	functions := make(map[string]func(byte, byte) bool)
	functions["AND"] = func(a, b byte) bool { return a == b && a == '-' }
	functions["OR"] = func(a, b byte) bool { return a == '-' || b == '-' }
	functions["XOR"] = func(a, b byte) bool { return a != b }
	functions["NAND"] = func(a, b byte) bool { return a != '-' || b != '-' }
	functions["NOR"] = func(a, b byte) bool { return a == b && a == '_' }
	functions["NXOR"] = func(a, b byte) bool { return a == b }


	inputs := make(map[string]string)
	for i := 0; i < n; i++ {
		var inputName, inputSignal string
		fmt.Scan(&inputName, &inputSignal)
		inputs[inputName] = inputSignal
	}


	for i := 0; i < m; i++ {
		var outputName, _type, inputName1, inputName2 string
		fmt.Scan(&outputName, &_type, &inputName1, &inputName2)

		fmt.Print(outputName, " ")
		for j := range inputs[inputName1] {
			if functions[_type](inputs[inputName1][j], inputs[inputName2][j]) {
				fmt.Print("-")
			} else {
				fmt.Print("_")
			}
		}
		fmt.Println()
	}
}
```