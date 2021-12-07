import { combineReducers, createStore } from 'redux';
import { todoReducer } from './todo-reducer';
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage' 


const persistConfig = {
    key: 'root',
    storage: localStorage
}

export type AppStateType = ReturnType<typeof reducers>

const reducers = combineReducers({
    todo: todoReducer
})



//const store = createStore(reducers) 
//export default store

const persistedReducer = persistReducer(persistConfig, reducers)

let store = createStore(persistedReducer)
export let persistor = persistStore(store)


export default store

// export default () => {
//     let store = createStore(persistedReducer)
//     let persistor = persistStore(store)
//     return { store, persistor }
// }