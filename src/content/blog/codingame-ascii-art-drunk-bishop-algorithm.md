---
title: 'Codingame puzzle walkthough: ASCII Art The Drunken Bishop Algorithm'
description: 'My implementation for the codingame puzzle: ASCII Art The Drunken Bishop Algorithm in golang'
pubDate: 2024-09-20
tags: ["go"]
---

Find the puzzle on Codingame: [Puzzle link](https://www.codingame.com/ide/puzzle/ascii-art-the-drunken-bishop-algorithm).

## Prompt 

The algorithm is well described in the document "The drunken bishop: An analysis of the OpenSSH fingerprint visualization algorithm".
To summarize, OpenSSH uses MD5 to generate a 128 bits fingerprint for the server's key, for example in hexadecimal
fc:94:b0:c1:e5:b0:98:7c:58:43:99:76:97:ee:9f:b7

You should create a chess board 17x9 (origin 0,0 at top left corner) and place a Bishop (the letter S) at the center (position 8,4).
```
            1111111
  01234567890123456
 +---[CODINGAME]---+ x
0|                 |
1|                 |
2|                 |
3|                 |
4|        S        |
5|                 |
6|                 |
7|                 |
8|                 |
 +-----------------+
 y
 ```

Then, break the 128 bit fingerprint in input into pairs of bits that define 4 possible moves:
- 00: up-left (↖ North West )
- 01: up-right (↗ North East)
- 10: down-left(↙ South West)
- 11: down-right (↘ South East)

During the 64 steps of the algorithm, the bit pairs are processed byte-wise, from left to right and least significant bits first.
```
Example: The fingerprint FC:94
       F     C       9     4   ...
     11 11 11 00 : 10 01 01 00 ...
      |  |  |  |    |  |  |  |
Step  4  3  2  1    8  7  6  5
```
For each pair of bits in the input we move the bishop one space on the board and increment a counter recording how many times we visit each square. Instead of moving off the board at the edges, the bishop slides along the sides as if they were walls. 

At the end of the 64 steps, the board is drawn assigning a symbol to each position on the board according to how many times it was visited. OpenSSH uses these symbols:
```
0  1  2  3  4  5  6  7  8  9  10 11 12 13 14
   .  o  +  =  *  B  O  X  @  %  &  #  /  ^
```
We apply the wrap-around logic if the number of times visited is greater than 14, e.g. we use `o` if a position is visited 17 times.

The special values S and the end value E mark the start and end position of the walk and overwrite the real value of the respective position. Surround the chessboard with + for corners, - for top and bottom edges and | for left and right edges. Put [CODINGAME] at center in the top edge.


## Parsing 

I start by initiating an empty grid full of 0. Then, I take the hexadecimal fingerprint, and convert it into binary.

```go

	func asBits(val uint64) []uint64 {
		bits := []uint64{}
		for i := 0; i < 8; i++ {
			bits = append([]uint64{val & 0x1}, bits...)
			val = val >> 1
		}
		return bits
	}

	// [...]

	grid := make([][]int, 9)
	for i := range grid {
		grid[i] = make([]int, 17)
	}
    
    currentI, currentJ := 4, 8
    
    for _, val := range strings.Split(fingerprint, ":") {
        
        i, _ := strconv.ParseUint(val, 16, 32)
        moves := asBits(i)
		// ...
	}
```

The `asBits` function works by iterating 8 times through the number provided (because we want to extract 8 bits, as specified in the prompt).
It's then using the golang bitwise operator `&` (AND) to extract the least significant bit. 

If we take a look at the truth table for the AND operator:
| A | B | `AND` |
|---|---|---|
|1|1|1|
|1|0|0|
|0|1|0|
|0|0|0|

We can see that by using the `&` operator between the number and 1 (`val & 0x1`), we'll have output the number.

The function then use the shift `>>` operator to shift val by one bit, effectively discarding the bit we just extracted and moving on to the next one.

## Move the Bishop

Once I've got the moves, I can execute each of these move on the grid created earlier.
 
I start by reading the bits two by two in the order specified in the prompt, and then ensure that it won't make the bishop slide off the grid. 
Once the move is executed, I increment the number in the grid where the bishop is to mark is passage.

```go
        moves := asBits(i)
        for i := 6; i >= 0 ;i-=2 {
            dirI, dirJ := 0, 0
            switch {
            case moves[i] == 1 && moves[i+1] == 1:
                dirI, dirJ = 1, 1
            case moves[i] == 1 && moves[i+1] == 0:
                dirI, dirJ = 1, -1
            case moves[i] == 0 && moves[i+1] == 1:
                dirI, dirJ = -1, 1
            case moves[i] == 0 && moves[i+1] == 0:
                dirI, dirJ = -1, -1
            }
    
            currentI += dirI
            currentJ += dirJ
            
            if currentI < 0 {currentI = 0}
            if currentJ < 0 {currentJ = 0}
            if currentI >= len(grid) {currentI = len(grid) - 1}
            if currentJ >= len(grid[0]) {currentJ = len(grid[0]) - 1}
            
            grid[currentI][currentJ] += 1
        }
```

## Output

Once I've executed every move, I print the grid, replacing the number in the grid by the corresponding symbol.

```go
    symbols := []string{" ", ".", "o", "+", "=", "*", "B", "O", "X", "@", "%", "&", "#", "/", "^"}

	fmt.Println("+---[CODINGAME]---+")
    for i := 0; i < 9; i++ {
        fmt.Print("|")
        for j := 0;j< 17;j++{
            if i == 4 && j == 8 {
                fmt.Print("S")
            } else if i == currentI && j == currentJ {
                fmt.Print("E")
            } else {
                fmt.Print(symbols[grid[i][j]%15])
            }
        }
        fmt.Print("|")
        fmt.Println()
    }    
    fmt.Println("+-----------------+")
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
    "strconv"
)

func asBits(val uint64) []uint64 {
    bits := []uint64{}
    for i := 0; i < 8; i++ {
        bits = append([]uint64{val & 0x1}, bits...)
        val = val >> 1
    }
    return bits
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Buffer(make([]byte, 1000000), 1000000)

	scanner.Scan()
	fingerprint := scanner.Text()

	grid := make([][]int, 9)
	for i := range grid {
		grid[i] = make([]int, 17)
	}
    
    currentI, currentJ := 4, 8
    
    for _, val := range strings.Split(fingerprint, ":") {
        
        i, _ := strconv.ParseUint(val, 16, 32)
        moves := asBits(i)
        for i := 6; i >= 0 ;i-=2 {
            dirI, dirJ := 0, 0
            switch {
            case moves[i] == 1 && moves[i+1] == 1:
                dirI, dirJ = 1, 1
            case moves[i] == 1 && moves[i+1] == 0:
                dirI, dirJ = 1, -1
            case moves[i] == 0 && moves[i+1] == 1:
                dirI, dirJ = -1, 1
            case moves[i] == 0 && moves[i+1] == 0:
                dirI, dirJ = -1, -1
            }
    
            currentI += dirI
            currentJ += dirJ
            
            if currentI < 0 {currentI = 0}
            if currentJ < 0 {currentJ = 0}
            if currentI >= len(grid) {currentI = len(grid) - 1}
            if currentJ >= len(grid[0]) {currentJ = len(grid[0]) - 1}
            
            grid[currentI][currentJ] += 1
        }
    }

    symbols := []string{" ", ".", "o", "+", "=", "*", "B", "O", "X", "@", "%", "&", "#", "/", "^"}

	fmt.Println("+---[CODINGAME]---+")
    for i := 0; i < 9; i++ {
        fmt.Print("|")
        for j := 0;j< 17;j++{
            if i == 4 && j == 8 {
                fmt.Print("S")
            } else if i == currentI && j == currentJ {
                fmt.Print("E")
            } else {
                fmt.Print(symbols[grid[i][j]%15])
            }
        }
        fmt.Print("|")
        fmt.Println()
    }    
    fmt.Println("+-----------------+")
}
```