<script>
	import boardStore from './state/board.js'
	import Board from './Board.svelte'
	import selected from './selected.store.js'
	import verify from './state/lines.js'
	import {gameOver} from './state/game.js'

 	import Keyboard from './Keyboard.svelte'
	
	let pressed
	let difficulty
	
	const apiCheck = ()=>{
		boardStore.getFromApi(9, difficulty)
	}
</script>

<main> 
	<Board  size={9}/>
	<button on:click={apiCheck}>Nowa Gra</button>
	<select bind:value={difficulty} default={1}>
		<option value={1}>Łatwy</option>
		<option value={2}>Średni</option>
		<option value={3}>Trudny</option>
	</select>
	<Keyboard bind:pressed boardSize={9}/>
	{#if $gameOver}
		<h1> GAME OVER</h1>
	{:else}
		<h1> STILL PLAYING .... </h1>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>