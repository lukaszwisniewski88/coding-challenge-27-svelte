<script>
  import board from "./state/board.js";
  import selected, { select } from "./selected.store.js";
  import intersection from "lodash.intersection";
  import squares from "./state/squares.js";
  import lines from "./state/lines.js";

  //export let boardSize = 9
  let boardExist = false
  let pressed = 0;
  let keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const save = () => {
    let { x, y } = $selected;
    board.setField({ x: x, y: y }, pressed);
  };
  const handler = event => {
    pressed = Number(event.target.innerText);
    save();
  };
  const handleKeys = event => {
    let { x, y } = $selected;
    switch (event.key) {
      case "ArrowUp":
        if (y > 0) select.set({ x: x, y: y - 1 });
        break;
      case "ArrowDown":
        if (y < 8) select.set({ x: x, y: y + 1 });
        break;
      case "ArrowRight":
        if (x < 8) select.set({ x: x + 1, y: y });
        break;
      case "ArrowLeft":
        if (x > 0) select.set({ x: x - 1, y: y });
        break;
      default:
        if (keys.includes(+event.key)) {
          pressed = +event.key;
          save();
        }
    }
    if ($selected.fixed) {
      handleKeys(event);
    }
  };
  const actionDelete = () => {
    pressed = " ";
    console.log("delete");
    save();
  };
  board.initialised.subscribe((value)=>{
      boardExist = value
  })
  $: {
    if (boardExist) {
      keys = intersection(
        $lines[$selected.lineX].remains,
        $lines[$selected.lineY].remains,
        $squares[$selected.square].remains
      )
    }
  }
</script>

<style>

</style>

<svelte:window on:keydown={handleKeys} />

<section>

  {#if !$selected.fixed}
    Klawiatura
    {#each keys as number}
      <button on:click={handler}>{number}</button>
    {/each}
    <button on:click={actionDelete}>USUŃ</button>
  {/if}

</section>
