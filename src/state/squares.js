import extract from "./extract";
import { derived } from "svelte/store";
import board from "./board";

export const squareNumber = (x, y) => {
  let col = Math.floor(x / 3);
  let row = Math.floor(y / 3);
  return col + 3 * row;
};

export default derived(board.fields, ($board) => {
  let squares = Array.from(new Array(9), () => []);
  $board.map((field) => {
    squares[squareNumber(field.x, field.y)].push(field);
  });
  return extract(squares);
});
