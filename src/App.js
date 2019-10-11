import React, { useEffect, useState, useRef, useReducer} from 'react';
import './App.css';


const Keys = {
  Space: 32,
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  a: 65,
  s: 83,
  w: 87,
  d: 68
}

// let move = Keys.Right;

function initState() {
  const grid = initGrid();
  return {
    grid,
    snake: {
      head: {
        row: 5,
        col: 9,
      },
      tail: [],
    },
    food: {
      row: Math.floor(Math.random() * 5),
      col: Math.floor(Math.random() * 5),
    },
    score: 0,
    showGrid: true,
    lost: false,
    message: 'Press <space> or touch/click to start the game',
    inprogress: false,
  }
}
function initGrid() {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const cols = [];
    for (let col = 0; col < 20; col++) {
      cols.push({
        row,
        col
      });
    }
    grid.push(cols);
  }
  return grid;
}



function App() {
  let reducer;
  const [state, dispatch] = useReducer(reducer, initState());


  const drawGrid = () => {
    const { grid } = state;
    console.log(grid)
    return (
      grid.map((row) => {
        return row.map(cell => {
          console.log('cell:', cell)
          let actorStyle = cellStyle(cell);
          return <div key={cell.row + cell.col} className={actorStyle} />
        });
      })
    );
  }

  const cellStyle = (cell) => {
    const { snake, food, showGrid } = state;
    let style = `cell `;
    if (snake.head.row === cell.row && snake.head.col === cell.col) {
      style = `cell head`;
    }
     else if (food.row === cell.row && food.col === cell.col) {
      style = `cell food`;
     }
     else if (snake.tail.find(t => t.row === cell.row
      && t.col === cell.col)) {
      style = `cell tail`;
    }

    style = showGrid ? style + ' cell-border' : style;
    return style;
  }

  return (
    <div className="App">
      <div className="grid-container">
        <div className="grid">
          {drawGrid()}
        </div>
      </div>
    </div>
  );
}

export default App;


//1-create grid
//2-create food some where in grid
//3-create snake
//4-make snake move
//5-make snake grow on eating food
//6-after eating make food appear on new grid
//7-end game if snake touches edges or it self
