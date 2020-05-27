import { get } from "svelte/store";
import board, { indexToCoords, coordsToIndex } from "./state/board";
import intersection from "lodash.intersection";
import squares from "./state/squares.js";
import lines from "./state/lines.js";
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
    let keys = intersection(
      $lines[selection.lineX].remains,
      $lines[selection.lineY].remains,
      $squares[selection.square].remains
    );
    if (keys.length === 1) {
      changes++;
      board.fields[coordsToIndex({ x: selection.x, y: selection.y })].update(
        (field) => {
          return {
            x: field.x,
            y: field.y,
            value: keys[0],
            fixed: field.fixed,
          };
        }
      );
    }
  });
  return [exitLines, exitSelected, exitSquares];
};
