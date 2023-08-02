import React, { useState } from 'react';
import Maze from './components/Maze';
import InputForm from './components/InputForm';
import Instruction from './components/Instruction';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export default function App() {
  const [speed, setSpeed] = useState(200);
  const [mazeSize, updateMazeSize] = useState(5);
  const [maze, updateMaze] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const isSafe = (n, x, y) => x >= 0 && y >= 0 && x < n && y < n && maze[x][y] === 0;
  const ratInAMaze = async (n, x, y) => {
    if (x === n - 1 && y === n - 1) {
      maze[x][y] = 2;
      return true;
    }
    await delay(speed);
    if (isSafe(n, x, y)) {
      setCurrentPosition({ x, y });
      maze[x][y] = 2;
      if (await ratInAMaze(n, x + 1, y)) return true;
      if (await ratInAMaze(n, x, y + 1)) return true;
      maze[x][y] = 0;
      setCurrentPosition({ x, y });
      return false;
    }
    return false;
  };
  const startVis = async () => {
    await ratInAMaze(mazeSize, 0, 0);
    await delay(300);
    const updatedMaze = maze.map(row => row.slice());
    for (let i = 0; i < updatedMaze.length; i++) {
      for (let j = 0; j < updatedMaze[i].length; j++) {
        if (updatedMaze[i][j] === 2) updatedMaze[i][j] = 3;
      }
    }
    updatedMaze[0][0] = 4;
    updatedMaze[mazeSize - 1][mazeSize - 1] = 4;
    updateMaze(updatedMaze);
  };
  return (
    <div className="main">
      <header>
        <h1>Rat in a Maze - Visualization</h1>
      </header>
      <InputForm
        updateMazeSize={updateMazeSize}
        updateMaze={updateMaze}
        startVis={startVis}
        setSpeed={setSpeed}
      />
      <Maze mazeSize={mazeSize} maze={maze} updateMaze={updateMaze} currentPosition={currentPosition} />
      <Instruction />
    </div>
  );
}
