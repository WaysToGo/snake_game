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

let move = Keys.Right;

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
    inProgress: false,
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

const reducer = (state, action) => {
  switch (action.type) {
    case 'game_lost':
      return {
        ...state,
        showGrid: state.showGrid,
        lost: true,
        message: 'Press <space> or touch/click to start the game',
        inProgress: false,
      }
    case 'update':
      return {
        ...state,
        ...action.newstate
      }

    case 'toggle_grid':
      return {
        ...state,
        showGrid: !state.showGrid
      };

    case 'restart':
      let newState = {
        ...state,
        message: 'Game in progress ☝',
        inProgress: true,
        lost: false,
        snake: {
          ...state.snake,
          head: {
            row: Math.floor(Math.random() * 5),
            col: Math.floor(Math.random() * 5),
          },
          tail: [],
        }
      }
      return newState;
    default: {
      console.log('DEFAULT ??');
      return state;
    }
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initState());
  const { score, snake, message, lost, inprogress } = state;

  const drawGrid = () => {
    const { grid } = state;
    return (
      grid.map((row) => {
        return row.map(cell => {
          let actorStyle = styleCell(cell);
          return <div key={cell.row + cell.col} className={actorStyle} />
        });
      })
    );
  }

  const styleCell = (cell) => {
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
  const randomizeFood = () => {
    const { snake } = state;
    const newFood = {
      row: Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10),
    }

    // If newFood position is same as withing snake path, randomize
    if (snake.head.row === newFood.row
      && snake.head.col === newFood.col) {
      return randomizeFood();
    }
    return newFood;
  }
  let collideWithFood = true;
  const gameEngine = () => {

    let x = 1, y = 0;

    if (move === Keys.Left) {
       [x, y]  = [-1, 0];
    } else if (move === Keys.Right) {
      [x, y] = [1, 0];
    } else if (move === Keys.Up) {
      [x, y] = [0, -1];
    } else if (move === Keys.Down) {
      [x, y] = [0, 1];
    }
    const nextState = {
      snake: {
        ...state.snake,
        head: {
          row: state.snake.head.row + y,
          col: state.snake.head.col + x
        },
        tail: [state.snake.head, ...state.snake.tail]
      },
      food: collideWithFood ?
        randomizeFood() : state.food,
      score: collideWithFood ? score + 1 : score,
    };

    dispatch({
      type: 'update',
      newstate: nextState
    });
  }
  return (
    <div className="App">
      <div className="grid-container">
        <div className="grid">
          {drawGrid()}
            {/* {setTimeout(() => {
            gameEngine()
          },3000)} */}
        </div>
      </div>
    </div>
  );
}


export default App;


//1-create grid-done
//2-create food some where in grid-done
//3-create snake done
//4-make snake move done
//5-make snake grow on eating food
//6-after eating make food appear on new grid
//7-end game if snake touches edges or it self
