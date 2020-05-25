import {writable} from 'svelte/store'
import {fromFetch} from 'rxjs/fetch'
import { switchMap, catchError } from 'rxjs/operators'


const {subscribe, update, set } = writable([], ()=>{
    // after subscribe
})

const setField = (coords, value, fixed=false) => {
    update((board)=>{
        let filtered = board.filter((field)=>{ 
            if(field.x===Number(coords.x) && field.y === Number(coords.y)) return true
        })
        if(!filtered[0].fixed){
            filtered[0].value.set(value)
            filtered[0].fixed = fixed
        }
        return [...board]
    })
}
const createField = (coords, value = ' ') => {
    let {x,y} = coords
    let valueStore = writable(value)
    update((board)=>{
        return [...board, {
            x:x,
            y:y,
            value:valueStore,
            fixed:false
        }]
    })
    return valueStore
}
export const getField = coords => {
    let index
    subscribe(board=>{
        index = board.filter(element=>(element.x === coords.x && element.y === coords.y))
        return board
    })
    return index[0]
}
export const isFixed = (coords) => {

    let {x,y} = coords
    let fixed = false
    update((board)=>{
        board.map(value=>{
            if(value.x === x && value.y === y){
                fixed = value.fixed
            }
        })
        return board
    })
    return fixed
}

const resetBoard = () => {
    update((board)=>{
        return board.map(element => {
            element.value.set(' ')
            element.fixed = false
            return element
        })
    })
}
const getFromApi = (size, difficulty = 1) => {
    let data = fromFetch(`https://cors-anywhere.herokuapp.com/http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=${size}&level=${difficulty}`)
        .pipe(switchMap((response)=>{
            if(response.ok){
                return response.json()
            }
        }), catchError(err=>{
            console.log(err)
            return {error:err}
        }))
        resetBoard()
        data.subscribe(value => {
            value.squares.map(element => {
                setField({x:element.x, y:element.y}, element.value, true)
            })
        })
}

export default {
    subscribe,
    setField,
    createField,
    getFromApi
}