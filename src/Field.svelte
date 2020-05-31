<script>
  import { onMount } from "svelte";
  import selected, { select } from "./selected.store.js";
  import lines from "./state/lines.js";
  import squares, { squareNumber } from "./state/squares.js";
  import board, { isFixed, coordsToIndex } from "./state/board.js";
  export let coords, sub;
  let value,
    blink,
    invalid,
    fixed = false;
  let line = [];
  let squareNum;
  onMount(() => {
    if (sub.cell > 0) {
      coords.x = 3 * sub.cell + coords.x;
    }
    if (sub.row > 0) {
      coords.y = 3 * sub.row + coords.y;
    }
    board.fields[coordsToIndex({ x: coords.x, y: coords.y })].subscribe(
      field => {
        value = field.value;
        fixed = field.fixed;
      }
    );
    selected.subscribe(coordinates => {
      let { x, y } = coordinates;
      if (x === coords.x && y === coords.y) {
        blink = true;
      } else blink = false;
    });
    line[0] = coords.x * 2;
    line[1] = coords.y * 2 + 1;
    squareNum = squareNumber(coords.x, coords.y);
  });
  const handler = () => {
    let { x, y } = coords;
    select.set({ x, y });
  };
</script>

<style>
  @keyframes selected {
    50% {
      background-color: gray;
    }
  }
  td {
    width: 30px;
    height: 30px;
    border: 1px solid black;
  }
  td.fixed {
    font-weight: bold;
  }
  td.blink {
    animation: selected 1.5s linear infinite;
  }
  td.invalid {
    color: red;
  }
</style>

<td
  class:fixed
  class:blink
  class:invalid
  data-x={+coords.x}
  data-y={+coords.y}
  on:click={handler}>
  {value}
</td>
