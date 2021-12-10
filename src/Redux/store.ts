import { applyMiddleware, combineReducers, createStore } from 'redux';
import { todoReducer } from './todo-reducer';
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage' 
import thunk from 'redux-thunk';

// const persistConfig = {
//     key: 'root',
//     storage: localStorage
// }

export type AppStateType = ReturnType<typeof reducers>

const reducers = combineReducers({
    todo: todoReducer
})

// const persistedReducer = persistReducer(persistConfig, reducers)

let store = createStore(reducers, applyMiddleware(thunk))
// export let persistor = persistStore(store)

export default store
