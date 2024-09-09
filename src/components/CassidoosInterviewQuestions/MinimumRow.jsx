import { useState } from 'react';

export const MinimumRow = () => {
  const [groupSizes, setGroupSizes] = useState([4, 8, 3, 5, 6]);
  const [rowSize, setRowSize] = useState(10);

  const minRows = (groupSizes, rowSize) => {
      const rows = [];
      for (const size of groupSizes.map(a => a).sort((a, b) => b - a)) {
        let foundSpace = false;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i] + size <= rowSize) {
            rows[i] += size;
            foundSpace = true;
            break;
          }
        }
        if (!foundSpace) {
          rows.push(size);
        }
      }
      return rows.length;
    }

  return (
      <div>
          <input 
            className='text-black'
            type="text" 
            value={groupSizes.join(', ')} 
            onChange={(e) => setGroupSizes(e.target.value.split(',').map(Number))} 
            placeholder="Enter group sizes (comma separated)" 
          />
          <input 
            className='text-black'
            type="number" 
            value={rowSize} 
            onChange={(e) => setRowSize(Number(e.target.value))} 
            placeholder="Enter row size" 
          />
          <div>
              {minRows(groupSizes, rowSize)}
          </div>
      </div>
  )
}