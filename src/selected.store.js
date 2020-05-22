import {writable, derived} from 'svelte/store'
import {squareNumber} from './validate'
import {isFixed} from './boardStore'
 
export const select = writable({x:0,y:0})

export default derived(select, (value) => {
    return {
        x:value.x,
        y:value.y,
        fixed:isFixed({x:value.x, y:value.y}),
        lineX : value.x*2,
        lineY : (value.y*2)+1,
        square: squareNumber(value.x, value.y)
    }
} )