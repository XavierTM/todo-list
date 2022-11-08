
import reducer from './reducer'
import { createStore } from 'redux'

const defaultState = {
   items: []
}


const store = createStore(reducer, defaultState);


export default store;