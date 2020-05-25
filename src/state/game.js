import squares from './squares'
import {derived} from 'svelte/store'

export const gameOver = derived(squares, ($squares) => {
  if ($squares && $squares.length > 0) {
    let fields = $squares.reduce(
      (acc, square) => acc + square.remains.reduce((acc, val) => acc + val, 0),
      0
    );
    if (fields === 0) return true;
    else return false;
  }
});
