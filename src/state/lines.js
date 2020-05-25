import extract from './extract'
import {derived} from 'svelte/store'
import board from './board'

export default derived(board, ($board) => {
  let lines = [];
  if ($board && $board.length === 81) {
    for (var i = 0; i <= 8; i++) {
      lines.push($board.filter((value) => value.x == i));
      lines.push($board.filter((value) => value.y == i));
    }
    return extract(lines);
  }
  return false;
});
