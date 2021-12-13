import { applyMiddleware, combineReducers, createStore } from 'redux';
import { todoReducer, todosSaga } from './todo-reducer';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';

export type AppStateType = ReturnType<typeof reducers>

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    todo: todoReducer
})

let store = createStore(reducers, applyMiddleware(sagaMiddleware, thunk))

sagaMiddleware.run(todosSaga)

export default store