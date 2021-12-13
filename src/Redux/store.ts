import { applyMiddleware, combineReducers, createStore } from 'redux';
import { todoReducer } from './todo-reducer';
import createSagaMiddleware from 'redux-saga'
import { todosSaga } from './sagas';

export type AppStateType = ReturnType<typeof reducers>

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    todo: todoReducer
})

const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(todosSaga)

export default store