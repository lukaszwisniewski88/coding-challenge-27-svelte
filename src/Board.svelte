<script>
    import Field from './Field.svelte'
    import board from './state/board.js'

    export let size = 9
    let boardInit
    board.initialised.subscribe(init=>{
        boardInit = init
    })
    console.log(boardInit)
    board.resetBoard(size)
    console.log(boardInit)

    
</script>
<style>
table{
    border-collapse: collapse;
    border-spacing: 0px;
}
</style>
<table>
{#each [...Array(Math.sqrt(size)).keys()] as row}
    <tr>
    {#each [...Array(Math.sqrt(size)).keys()] as cell}
    <td>
        <table class="sub-table" data-row={row} data-cell={cell}>
            {#each [...Array(Math.sqrt(size)).keys()] as y}
                <tr>
                {#each [...Array(Math.sqrt(size)).keys()] as x}
                    <Field coords={{x:x,y:y}} sub={{row,cell}}/>
                {/each}    
                </tr>
            {/each}
        </table>
    </td>
    {/each}
    </tr>
{/each}
</table>
