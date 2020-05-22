<script>
    import {onMount} from 'svelte'
    import selected , {select}from './selected.store.js'
    import {validateLines} from './validate'
    import board, {isFixed, getField} from './boardStore.js'
    export let coords, sub
    let value, blink, invalid, fixed = false
    let line = []
    onMount(()=>{
        if(sub.cell > 0){
            coords.x = 3*sub.cell + coords.x
        }
        if(sub.row > 0){
            coords.y = 3*sub.row + coords.y
        }
        value = board.createField(coords)
        line[0] = coords.x*2
        line[1] = (coords.y*2)+1
        
    })
    const handler = () => {
        let {x,y} = coords
        select.set({x,y}) 
        
    }
    $: {
        if($value && getField(coords).fixed){
            console.log('fixing')
            fixed = true
        }
        else fixed = false
        if($selected.x == coords.x && $selected.y == coords.y) {
            blink = true
        }
        else blink = false

        //if(isFixed(coords)) fixed = true
        //else fixed = false

        if($validateLines && ($validateLines[line[0]].duplicate || $validateLines[line[1]].duplicate)) invalid = true
        else invalid = false
    }
</script>
<style>
@keyframes selected {
    50% {
        background-color: gray; 
    }

}
td{
    width:30px;
    height:30px;
    border:1px solid black;
}
td.fixed{
    font-weight: bold;
}
td.blink{
    animation: selected 1.5s linear infinite ;
}
td.invalid{
    color:red;
}
</style>

<td class:fixed class:blink class:invalid data-x={+coords.x} data-y={+coords.y} on:click={handler}>
    {$value}
</td>