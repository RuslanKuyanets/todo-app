import { call, put, takeEvery } from "redux-saga/effects"
import { todoApi } from "../api/api"
import { ActionTypes, todoActions, TodoListItemType } from "./todo-reducer"

interface Error {
    message: string
}

function* removeCompletedTodos() {
    try {
        yield call(todoApi.removeCompletedTodos)      
        yield put(todoActions.removeCompletedSuccess())      
    } catch (error) {
        yield put(todoActions.removeCompletedError((error as Error).message))
    }
}

function* toggleProgressAll(action: {type: string, payload: boolean}) {
    try {      
        yield call(todoApi.toggleProgressAll, !action.payload)        
        yield put(todoActions.toggleProgressAllSuccess())
    } catch (error) {
        yield put(todoActions.getTodosError((error as Error).message))      
    }
}

function* toggleProgressTodo(action: {type: string, payload: TodoListItemType}) {
    try {
        yield call(todoApi.toggleProgress, action.payload.id, action.payload.progress)      
        yield put(todoActions.toggleProgressSuccess(action.payload.id))       
    } catch (error) {
        yield put(todoActions.toggleProgressError((error as Error).message))   
    }
}

function* changeTodo(action: {type: string, payload: TodoListItemType}) {
    try {
        yield call(todoApi.updateTodo, action.payload.id, action.payload.title)      
        yield put(todoActions.changeTaskSuccess(action.payload))          
    } catch (error) {
        yield put(todoActions.changeTaskError((error as Error).message))  
    }
}

function* removeTodo(action: {type: string, payload: string}) {
    try {
        yield call(todoApi.removeTodo, action.payload)      
        yield put(todoActions.removeTaskSuccess(action.payload))         
    } catch (error) {
        yield put(todoActions.removeTaskError((error as Error).message))  
    }
}

function* addTodo(action: {type: string, payload: string}) {
    try {
        const response: TodoListItemType = yield call(todoApi.addTodo, action.payload)      
        yield put(todoActions.addTaskSuccess(response))      
    } catch (error) {
        yield put(todoActions.addTaskError((error as Error).message))  
    }
}

function* getTodos() {
    try {
        yield put(todoActions.toggleIsFetching(true))
        const response: TodoListItemType[] = yield call(todoApi.getTodos)        
        yield put(todoActions.getTodosSuccess(response.reverse()))
        yield put(todoActions.toggleIsFetching(false))      
    } catch (error) {
        yield put(todoActions.getTodosError((error as Error).message))
    }
}

export function* todosSaga() {
    yield takeEvery(ActionTypes.GET_TODOS, getTodos);
    yield takeEvery(ActionTypes.ADD_TASK, addTodo);
    yield takeEvery(ActionTypes.REMOVE_TASK, removeTodo);
    yield takeEvery(ActionTypes.CHANGE_TASK, changeTodo);
    yield takeEvery(ActionTypes.TOGGLE_PROGRESS, toggleProgressTodo);
    yield takeEvery(ActionTypes.TOGGLE_PROGRESS_ALL, toggleProgressAll);
    yield takeEvery(ActionTypes.REMOVE_COMPLETED, removeCompletedTodos);
}