import { useState } from 'react'

export const Island = () => {
    const [island, setIsland] = useState([
        [0,1,1,1,0,0,0,1,1],
        [0,1,1,1,0,1,0,0,0],
        [0,1,0,0,0,0,0,1,0],
        [0,0,1,1,0,1,1,1,0],
    ])    

    const switchTile = (i, j, val) => {
        let newIsland = island.map((row, rowIndex) => {
            if (rowIndex === i) {
                return row.map((cell, cellIndex) => {
                    if (cellIndex === j) {
                        return val
                    }
                    return cell
                })
            }
            return row
        })
        setIsland(newIsland)
    }

    const maxAreaOfIsland = (originalMap) => {
        let islandMap = originalMap.map(r => r.map(c => c))
        let biggest = 0
        
        for (let i = 0; i < islandMap.length; i++) {
            for (let j = 0; j < islandMap[i].length; j++) {
            if (islandMap[i][j] === 1) {
                biggest = Math.max(biggest, dfs(islandMap, i, j))
            }
            }
        }
        return biggest
        }
    
    const dfs = (islandMap, x, y) => {
        if (x < 0 || x >= islandMap.length || y < 0 || y >= islandMap[0].length || islandMap[x][y] === 0) {
            return 0
        }        
        islandMap[x][y] = 0
        
        return 1 + dfs(islandMap, x + 1, y) + dfs(islandMap, x - 1, y) + dfs(islandMap, x, y + 1) + dfs(islandMap, x, y - 1)
    }

    return (
        <div>
            <div style={{display:'flex', alignItems:'center'}} >
                <div>
                    {
                        island.map((row, i) => {
                            return (
                                <div  key={`row-${i}`} style={{display:'flex'}} >
                                    {row.map((cell, j) => {
                                        return <div key={`cell-${i}-${j}`} onClick={() => switchTile(i, j, cell === 0 ? 1 : 0)} style={{width:'25px', height:'25px', backgroundColor: cell === 0 ? 'blue' : 'green'}}>{cell}</div>
                                    })}
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{marginLeft:'10px'}} >Click on the cells to switch them from sea to land or from land to sea!</div>
            </div>
            Biggest island size = {maxAreaOfIsland(island)}
        </div>
    )
}