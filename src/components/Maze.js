import React from 'react';
import Cell from './Cell';

export default function Maze(props) {
  const { maze, mazeSize, updateMaze, pathFound } = props;
  const handleCellRender = (rowNum, cellNum, cellState) => {
      return (
        <Cell
          key={`${rowNum}${cellNum}`}
          state={cellState}
          y={rowNum}
          x={cellNum}
          mazeSize={mazeSize}
          updateMaze={updateMaze}
        />
      );
  };
  return (
    <div className="maze">
      {maze.map((row, rowNum) => (
        <div className="row" key={rowNum}>
          {row.map((cell, cellNum) => handleCellRender(rowNum, cellNum, cell))}
        </div>
      ))}
    </div>
  );
}
