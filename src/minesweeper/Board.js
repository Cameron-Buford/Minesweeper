import React, {useState} from 'react'
import Cell from '../Cell/Cell'

const Board = ({grid, rows, columns}) => {
    const [neighbors] = useState([
        [1, 0],
        [1, -1],
        [1, 1],
        [0, 1],
        [0, -1],
        [-1, 0],
        [-1, 1],
        [-1, -1]
    ])
    const checkNeighbors = (x, y) => {
        let count = 0;
        neighbors.forEach(([newX, newY]) => {
            if(
                x + newX >= 0 && 
                x + newX < rows &&
                y + newY >= 0 &&
                y + newY < columns
            ){
                if(grid[x + newX][y+ newY].isBomb){
                    count++
                }
            }
        })
        return count
    }
    const clickCell = (x, y) => {
        const newGrid = [...grid]
        if(newGrid[x][y].isClicked){
            return 
        }
        if(newGrid[x][y].isBomb){
            revealBoard()
        }
        const newCount = checkNeighbors(x, y)
        newGrid[x][y].count = newCount
        newGrid[x][y].isClicked = true
            if(!newGrid[x][y].isBomb && newCount === 0){
            neighbors.forEach(([newX, newY]) => {
                if(
                    x + newX >= 0 &&
                    x + newX < rows &&
                    y + newY >= 0 &&
                    y + newY < columns
                ){
                    clickCell(x + newX, y + newY)
                }
            })
    }

    }

const revealBoard = ()=> {
    grid.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            gird[rowIndex][columnIndex].isClicked = true
        })
    })
}
return (
    <div
    style= {{
        height: `${columns * 10 + columns * 2}`,
        width: `${rows * 10 + rows * 2}`,
        display: "grid",
        margin: 0,
        padding: 0,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridColumnGap:0,
        gridRowGap: 0
    }}
    >
        {grid.map(row => {
            return (
                <>
                {row.map(cell => {
                    return(
                        <Cell
                            cell= {cell}
                            checkNeighbors= {checkNeighbors}
                            clickCell = {clickCell}
                            />
                    )
                })}
                </>
            )
        })}
    </div>
)
    }

    export default Board






   