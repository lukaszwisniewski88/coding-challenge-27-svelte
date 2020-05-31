import {writable, get} from 'svelte/store'
import {fromFetch} from 'rxjs/fetch'
import { switchMap, catchError } from 'rxjs/operators'


const board = Array(Math.pow(9,2))
const size = 9
const initialised = writable(false)

export const coordsToIndex = (coords) => {
    let {x,y} = coords
	return (y*size)+x
}
export const indexToCoords = (index) => {
    return {
        x:index%size,
		y:Math.floor(index/size)
	}
}
export const isFixed = (coords) => {
    let index = coordsToIndex(coords)
    let value = get(board[index])
    return value.fixed
}
const setField = (coords, value, fixed=false) => {
    let index = coordsToIndex(coords)
    board[index].update(field=>{
        return {
            x:field.x,
            y:field.y,
            value:value,
            fixed:fixed
        }
    })
}
const resetBoard = () => {
    initialised.set(false)
    for(let index = 0; index < Math.pow(size,2) ; index++){
        let {x,y} = indexToCoords(index)
        board[index] = writable({
            x:x,
            y:y, 
            value: ' ',
            fixed : false
        })
    }
    initialised.set(true)
}
const clearBoard = () => {
    for(let index = 0; index < Math.pow(size,2) ; index++){
        let {x,y} = indexToCoords(index)
        board[index].set({
            x:x,
            y:y, 
            value: ' ',
            fixed : false
        })
    }
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
        clearBoard()
        data.subscribe(value => {
            value.squares.map(element => {
                setField({x:element.x, y:element.y}, element.value, true)
            })
        })
}

export default {
    setField,
    resetBoard,
    clearBoard,
    getFromApi,
    fields:board,
    initialised
}