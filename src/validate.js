import {derived} from 'svelte/store'
import difference from 'lodash.difference'
import board from './boardStore'



const duplicates = (array) => {
    for(var i = 1;i<=9 ; i++){
        let filtered = array.filter((value)=>value===i)
        if(filtered.length>1){
            return true
        }
    }
    return false
}
const remains = (array) => {
   return difference([1,2,3,4,5,6,7,8,9], array)
}
const extract = (data)=>{
    return data.map(line => {
        let arr = []
        line.map((inner)=>{
            inner.value.subscribe(val=>{
                arr.push(val)
            })
        })
        return {
            full : arr,
            duplicate: duplicates(arr),
            remains:remains(arr)
        }
    }) 
}
export const validateLines = derived(board, ($board)=>{
    let lines = []
    if($board && $board.length===81) {
        for(var i=0;i<=8;i++){
            lines.push($board.filter(value=>(value.x == i))) 
            lines.push($board.filter(value=>(value.y == i)))
        }
        return extract(lines)
    }
    return false
})

export const squareNumber = (x,y) => {
    let col = Math.floor(x/3)
    let row = Math.floor(y/3)
    return col + (3*row)
}
export const validateSquares = derived(board, ($board)=>{
    let squares = Array.from(new Array(9), () => [])
    if($board && $board.length===81) {
        $board.map((element)=>{
            squares[squareNumber(element.x,element.y)].push(element) 
        })
        return extract(squares)
    }
    return false
})
