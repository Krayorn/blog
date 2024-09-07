import React, { useState } from 'react';

export const ShoeCount = () => {
    const [shoes, setShoes] = useState([
        'L-7', 'R-7', 'L-8', 'R-9', 'L-9', 'R-8'
    ]);
    const shoeSizes = [6, 6.5, 7, 7.5, 8, 8.5, 9];

    function maxPairs(shoes) {
        const shoeCounts = {};
        const pairs = [];
        const leftover = [];

        for (const shoe of shoes) {
            const [type, size] = shoe.split('-');
            const oppositeShoe = `${type === 'L' ? 'R' : 'L'}-${size}`;

            if (shoeCounts[oppositeShoe]) {
                pairs.push([shoe, oppositeShoe]);
                shoeCounts[oppositeShoe]--;
                if (shoeCounts[oppositeShoe] === 0) {
                    delete shoeCounts[oppositeShoe];
                }
            } else {
                shoeCounts[shoe] = (shoeCounts[shoe] || 0) + 1;
                leftover.push(shoe);
            }
        }

        return { pairs, leftover };
    }

    const addShoe = (size, side) => {
        setShoes([...shoes, `${side}-${size}`]);
    };

    const removeShoe = (index) => {
        setShoes(shoes.filter((_, i) => i !== index));
    };

    const { pairs, leftover } = maxPairs(shoes);

    const pairCounts = pairs.reduce((acc, [shoe]) => {
        const size = shoe.split('-')[1];
        acc[size] = (acc[size] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Shoe Pair Counter</h2>
            <table className="mb-6">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Size</th>
                        <th className="px-4 py-2">Left</th>
                        <th className="px-4 py-2">Right</th>
                    </tr>
                </thead>
                <tbody>
                    {shoeSizes.map(size => (
                        <tr key={size}>
                            <td className="px-4 py-2">{size}</td>
                            <td className="px-4 py-2">
                                <button 
                                    onClick={() => addShoe(size, 'L')}
                                    className="border border-gray-300 font-bold py-1 px-2 rounded"
                                >
                                    Add Left
                                </button>
                            </td>
                            <td className="px-4 py-2">
                                <button 
                                    onClick={() => addShoe(size, 'R')}
                                    className="border border-gray-300 font-bold py-1 px-2 rounded"
                                >
                                    Add Right
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Pairs Made:</h3>
                    <ul className="list-disc pl-5 mb-2">
                        {Object.entries(pairCounts).map(([size, count]) => (
                            <li key={size}>Size {size}: {count} pair(s)</li>
                        ))}
                    </ul>
                    <p className="font-bold">Total Pairs: {pairs.length}</p>
                </div>
                <div className='ml-8' >
                    <h3 className="text-xl font-semibold mb-2">All Shoes:</h3>
                    <div className="flex flex-wrap gap-2">
                        {shoes.map((shoe, index) => (
                            <div key={index} className="flex items-center border border-gray-300 rounded-lg p-2">
                                <span>{shoe}</span>
                                <button 
                                    onClick={() => removeShoe(index)}
                                    className="ml-2 font-bold"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};