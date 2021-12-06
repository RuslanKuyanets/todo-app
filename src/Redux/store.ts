import { combineReducers, createStore } from "redux";
import { todoReducer } from "./todo-reducer";

export type AppStateType = ReturnType<typeof reducers>

let reducers = combineReducers({
    todo: todoReducer
})

const store = createStore(reducers)

export default store