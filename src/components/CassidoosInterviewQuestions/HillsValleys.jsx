import { useState } from 'react';

export const HillsValleys = () => {
    const [input, setInput] = useState("")

    const hills = (arr) => elevation(arr, false)
    const valleys = (arr) => elevation(arr, true)

    const elevation = (arr, down) => {
        let c = 0
        
        let mark = false
        for (let i = 1;i<arr.length;i++) {
            if ((down && arr[i] < arr[i-1]) || (!down && arr[i] > arr[i-1]) ) {
                mark = true
            }

            if (mark && ((down && arr[i] > arr[i-1]) || (!down && arr[i] < arr[i-1]))) {
                c++
                mark = false
            }
        }
        return c
    }

    return (
        <div>
            <input style={{width: "200px"}} type="text" value={input} onChange={e => setInput(e.target.value)} placeholder='3,4,1,1,6,5'></input>
            <p>Hills: {hills(input.split(',').map(a => parseInt(a)))}</p>
            <p>Valleys: {valleys(input.split(',').map(a => parseInt(a)))}</p>
        </div>
    )
}