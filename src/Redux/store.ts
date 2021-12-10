import { applyMiddleware, combineReducers, createStore } from 'redux';
import { todoReducer } from './todo-reducer';
import thunk from 'redux-thunk';

export type AppStateType = ReturnType<typeof reducers>

const reducers = combineReducers({
    todo: todoReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

export default store
