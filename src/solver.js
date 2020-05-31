import { get } from "svelte/store";
import board, { indexToCoords, coordsToIndex } from "./state/board";
import intersection from "lodash.intersection";
import squares from "./state/squares.js";
import lines from "./state/lines.js";
import {gameOver} from './state/game'
import selected, { select } from "./selected.store";

let changes = 0;

export const solve = () => {
  let subcriptions = findSoloCandidates();

  do {
    changes = 0;
    board.fields.map((field, index) => {
      if (get(field).value === " ") {
        select.set(indexToCoords(index));
      }
    });
  } while (changes != 0);
  subcriptions.map((unsub) => unsub());
  if(get(gameOver)===false) solveBack()
};

const findSoloCandidates = () => {
  let $lines, $squares;
  const exitLines = lines.subscribe((array) => {
    $lines = array;
  });
  const exitSquares = squares.subscribe((array) => {
    $squares = array;
  });
  const exitSelected = selected.subscribe((selection) => {
    let possibilities = intersection(
      $lines[selection.lineX].remains,
      $lines[selection.lineY].remains,
      $squares[selection.square].remains
    );
    if (possibilities.length === 1) {
      changes++;
      board.fields[coordsToIndex({ x: selection.x, y: selection.y })].update(
        (field) => {
          return {
            ...field,
            value: possibilities[0],
          };
        }
      );
    }
  });
  return [exitLines, exitSelected, exitSquares];
};

const solveBack = () => {
  let $lines, $squares, possibilities;
  const exitLines = lines.subscribe((array) => {
    $lines = array;
  });
  const exitSquares = squares.subscribe((array) => {
    $squares = array;
  });
  const exitSelected = selected.subscribe((selection) => {
    possibilities = intersection(
      $lines[selection.lineX].remains,
      $lines[selection.lineY].remains,
      $squares[selection.square].remains
    );
  });
  const FindEmptyCell = () => {
    let find = board.fields.findIndex((field) => {
      return get(field).value === " "})
    if(find!==-1) return find 
    else{
      return false
    } 
  };
  const ResetCell = (coords) => {
    board.fields[coordsToIndex(coords)].update((field) => {
      return {
        ...field,
        value: ' ',
      };
    });
  }
  const getPossibilities = (cellIndex)=>{
    select.set(indexToCoords(cellIndex))
  }
  function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}
  //find next empty cell
  //for value in possibilities
  //if no possibilities return
  //if after all possibilities not end reset field
  const next = () => {
    const workingCell = FindEmptyCell()
    if(workingCell===false) return true // nie ma pustej
    getPossibilities(workingCell)
    for (const value of possibilities) {
      board.fields[workingCell].update(field => {
        return {
          ...field,
          value: value,
        };
      });
      if(next()) return true;
      ResetCell(indexToCoords(workingCell))
    }
    return false
  };

  next()
  exitLines()
  exitSquares()
  exitSelected()
};
