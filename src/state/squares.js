import board from './board'
import {derived} from 'svelte/store'
import extract from './extract'

export const squareNumber = (x, y) => {
  let col = Math.floor(x / 3);
  let row = Math.floor(y / 3);
  return col + 3 * row;
};

export default derived(board, ($board) => {
  let squares = Array.from(new Array(9), () => []);
  if ($board && $board.length === 81) {
    $board.map((element) => {
      squares[squareNumber(element.x, element.y)].push(element);
    });
    return extract(squares);
  }
  return false;
});
