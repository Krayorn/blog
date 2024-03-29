import { useState } from 'react';

export const MaxDiff = () => {
    const [input, setInput] = useState("")

    const maxDiff = (arr) => {
        arr = arr.sort((a, b) => a - b)

        let max = 0
        for (let i = 1;i<arr.length;i++) {
            const diff = arr[i] - arr[i-1]
            if (diff > max) {
                max = diff
            }
        }

        return max
    }

    return (
        <div>
            <input style={{width: "200px"}} type="text" value={input} onChange={e => setInput(e.target.value)} placeholder='3,6,9,1,2'></input>
            <p>Max difference for {input} is {maxDiff(input.split(',').map(a => parseInt(a)))}</p>
        </div>
    )
}