<script>
    import state from './state/board.js'
    import Field from './Field.svelte'
    export let size = 9
    
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
