import { useState } from 'react';

export const UniqueChars = () => {
  const [inputStr, setInputStr] = useState("abccbcfegh")

    const longestSubstrofTwoUniqueChars = (str) => {
        if (str.length < 3) {
            return str.length
        }
        
        let charsByCount = {}
        let start = 0
        let maxCount = 0;

        charsByCount[str[start]] = (charsByCount[str[start]] || 0) + 1;

        for (let end = 1; end < str.length; end++) {
            charsByCount[str[end]] = (charsByCount[str[end]] || 0) + 1;

            while (true) {
                if (Object.values(charsByCount).length > 2) {
                    charsByCount[str[start]] = charsByCount[str[start]] - 1
                    if (charsByCount[str[start]] === 0) {
                        delete charsByCount[str[start]]
                    }
                    start++
                    continue
                }
                break
            }

            if (end - start + 1 > maxCount) {
                maxCount = end - start + 1
            }
        }

        return maxCount
    }

  return (
    <div>
        <input style={{width: "200px", color:"black"}} type="text" value={inputStr} onChange={e => setInputStr(e.target.value)} placeholder='abbbccbbcbcb'></input>
        <div>
            Result: {longestSubstrofTwoUniqueChars(inputStr)}
        </div>
    </div>
  );
};