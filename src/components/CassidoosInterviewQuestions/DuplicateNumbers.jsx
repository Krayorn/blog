import { useState } from 'react';

export const DuplicateNumbers = () => {
    const [numbers, setNumbers] = useState([11, 12, 22, 23])

    function sumUniqueNumbers(arr) {
        let sum = 0;
        for (let num of arr) {
            if (isUnique(num)) {
                sum += num;
            }
        }
        return sum;
    }
    
    function isUnique(num) {
        const numString = num.toString();
        const digitSet = new Set();
        for (let digit of numString) {
            if (digitSet.has(digit)) {
                return false;
            }
            digitSet.add(digit);
        }
        return true;
    }

    const isDuplicateIn = (n, number) => {
        const numString = number.toString();
        const digitSet = new Set();
        for (let digit of numString) {
            if (digitSet.has(digit) && digit === n) {
                return true;
            }
            digitSet.add(digit);
        }
        return false;
    }

    const addNumber = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        e.target.reset();
        const number = formData.get("number");
        setNumbers([...numbers, parseInt(number)]);
    }

    const removeNumber = (index) => {
        const newNumbers = numbers.map(i => i)
        newNumbers.splice(index, 1)
        setNumbers(newNumbers)
    }

    return (
        <div>
            <div className='flex flex-wrap'>
            {
                numbers.map((number, i) => {
                    return <div className={`flex flex-col w-fit mr-2`} key={i}>
                        <span className={`bg-slate-700 rounded-md p-2 border-2 ${isUnique(number) ? 'border-green-500' : 'border-red-500'}`} >{number.toString().split('').map((n, i) => (<span key={i} className={`${isDuplicateIn(n, number) ? 'text-red-500' : ''}`} >{n}</span>))}</span>
                        <div className='text-center cursor-pointer' onClick={() => removeNumber(i)} >x</div>
                    </div>
                })
            }
            </div>

            <div className='mt-4' >
                Sum of valid numbers is: <span className='text-lg' >{sumUniqueNumbers(numbers)}</span>
            </div>
                


            <form className='mt-4' onSubmit={addNumber}  >
                <input  className='w-16 rounded-md p-2 bg-slate-700 text-white' placeholder='12' name="number" type="number"></input>
                <button  className='ml-2 rounded-md border-2 border-white p-2' type="submit" >Add number</button>
            </form>
        </div>
    )
}