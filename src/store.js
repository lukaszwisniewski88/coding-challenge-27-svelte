import {writable} from 'svelte/store'

const {subscribe, update, set} = writable()

const write = (index, value) =>{
    update(state=>{
        
    })
}
const validate = (value, state)=> {
    if(state.includes(value)){
        return false
    }else return false
}
export const createStore = () => { 
    subscribe,
    write
}
