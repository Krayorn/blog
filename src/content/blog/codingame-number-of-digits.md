---
title: 'Codingame puzzle walkthough: Number of Digits'
description: 'My implementation for the codingame puzzle: Number of Digits in golang'
pubDate: 2024-09-15
tags: ["go"]
---

Find the puzzle on Codingame: [Puzzle link](https://www.codingame.com/ide/puzzle/number-of-digits).

## Parsing 

For the setup of this puzzle, we're storing each digit of the max number in an array.
This is splitting the "unit", the "ten", the "hundred", etc... numbers. This is what will allow us to save time by saving the results of some exploration.

We're also creating a memo array that will be used to save those results.

```go
    digits := make([]int, 9)
    memo = make([][]int, 9)
    for i := range memo {
        row := make([]int, 9)
        for j := range row {
            row[j] = -1
        }
        memo[i] = row
    }

    length := 0
    for (n > 0) {
        digits[length] = n % 10
        length++
        n = int(math.Floor(float64(n / 10)))
    }
```

## The algo

Now the hard part!
Here's the code without the memoization to start.

Starting at the digit representing the biggest unit (ie: the 3 in 341 for the hundreds) we're iterating from 0 to that digit, adding one to our count if it's our target, then launching the same algo on the next biggest digit (ie: the 4 in 341 for the tens). 

The limit is used to make sure we're not counting digit after our number. the limit stays on only when we launch the search from the last possible digit. If we're from an earlier digit, we remove it, and will then iterate from 0 to 9.

```go
// We call fmt.Println(dfs(digits, k, length-1, 0, true))
func dfs(digits []int, target, pos, count int, limit bool) int {
    if pos < 0 {
        return count
    }

    ans := 0
    bound := 9
    if limit {
        bound = digits[pos]
    }

    for i := 0; i<=bound;i++{
        add := 0
        if i == target {
            add = 1
        }
        ans += dfs(digits, target, pos -1, count + add, limit && i == bound)
    }

    return ans
}
```

This means that for 341, we will:
- Iterate between 0 and 3 (limit is **true**)
    - 0 : Iterate between 0 and 9 (limit is false)
        - 0 : Iterate between 0 and 9 (limit is false)
        [...]
        - 9 : Iterate between 0 and 9 (limit is false)
    - 1 : Iterate between 0 and 9 (limit is false)
        - 0 : Iterate between 0 and 9 (limit is false)
        [...]
        - 9 : Iterate between 0 and 9 (limit is false)
    - 2 : Iterate between 0 and 9 (limit is false)
        - 0 : Iterate between 0 and 9 (limit is false)
        [...]
        - 9 : Iterate between 0 and 9 (limit is false)
    - 3 : Iterate between 0 and 4 (limit is **true**)
        - 0 : Iterate between 0 and 9 (limit is false)
        [...]
        - 4 : Iterate between 0 and 1 (limit is **true**)

And remember that each time we find our target, we're incrementing our count by one

We can now add the memo. Before iterating through the numbers, if limit is false (most of the time) we're checking if we didn't already made a check for this position and this count. If we did, we just return the count found last time.

If we didn't, we do it, then save the result!

```go
// We call fmt.Println(dfs(digits, k, length-1, 0, true))
func dfs(digits []int, target, pos, count int, limit bool) int {
    if pos < 0 {
        return count
    }

    if !limit && memo[pos][count] != -1 {
        return memo[pos][count]
    }

    ans := 0
    bound := 9
    if limit {
        bound = digits[pos]
    }

    for i := 0; i<=bound;i++{
        add := 0
        if i == target {
            add = 1
        }
        ans += dfs(digits, target, pos -1, count + add, limit && i == bound)
    }

    if !limit {
        memo[pos][count] = ans
    }

    return ans
}
```


## Complete solution

If you have any questions or suggestions, send me a message at `me@krayorn.com` or a DM on [Twitter/X](https://x.com/Krayorn)

```go
package main

import "fmt"
import "math"

var memo [][]int

func main() {
    var n int
    fmt.Scan(&n)
    
    var k int
    fmt.Scan(&k)
    
    digits := make([]int, 9)
    memo = make([][]int, 9)
    for i := range memo {
        row := make([]int, 9)
        for j := range row {
            row[j] = -1
        }
        memo[i] = row
    }

    length := 0
    for (n > 0) {
        digits[length] = n % 10
        length++
        n = int(math.Floor(float64(n / 10)))
    }
    fmt.Println(dfs(digits, k, length-1, 0, true))
}

func dfs(digits []int, target, pos, count int, limit bool) int {
    if pos < 0 {
        return count
    }

    if !limit && memo[pos][count] != -1 {
        return memo[pos][count]
    }

    ans := 0
    bound := 9
    if limit {
        bound = digits[pos]
    }

    for i := 0; i<=bound;i++{
        add := 0
        if i == target {
            add = 1
        }
        ans += dfs(digits, target, pos -1, count + add, limit && i == bound)
    }

    if !limit {
        memo[pos][count] = ans
    }

    return ans
}
```