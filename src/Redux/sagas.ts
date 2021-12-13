import { call, put, takeEvery } from "redux-saga/effects"
import { todoApi } from "../api/api"
import { ActionTypes, todoActions, TodoListItemType } from "./todo-reducer"

function* removeCompletedTodos() {
    try {
        yield call(todoApi.removeCompletedTodos)      
        yield put(todoActions.removeCompletedSuccess())      
    } catch (error: any) {
        yield put(todoActions.removeCompletedError(error.message))
    }
}

function* toggleProgressAll(action: {type: string, payload: boolean}) {
    try {      
        yield call(todoApi.toggleProgressAll, !action.payload)        
        yield put(todoActions.toggleProgressAllSuccess())
    } catch (error: any) {
        yield put(todoActions.getTodosError(error.message))      
    }
}

function* toggleProgressTodo(action: {type: string, payload: TodoListItemType}) {
    try {
        yield call(todoApi.toggleProgress, action.payload.id, action.payload.progress)      
        yield put(todoActions.toggleProgressSuccess(action.payload.id))       
    } catch (error: any) {
        yield put(todoActions.toggleProgressError(error.message))   
    }
}

function* changeTodo(action: {type: string, payload: TodoListItemType}) {
    try {
        yield call(todoApi.updateTodo, action.payload.id, action.payload.title)      
        yield put(todoActions.changeTaskSuccess(action.payload))          
    } catch (error: any) {
        yield put(todoActions.changeTaskError(error.message))  
    }
}

function* removeTodo(action: {type: string, payload: string}) {
    try {
        yield call(todoApi.removeTodo, action.payload)      
        yield put(todoActions.removeTaskSuccess(action.payload))         
    } catch (error: any) {
        yield put(todoActions.removeTaskError(error.message))  
    }
}

function* addTodo(action: {type: string, payload: string}) {
    try {
        const response: TodoListItemType = yield call(todoApi.addTodo, action.payload)      
        yield put(todoActions.addTaskSuccess(response))      
    } catch (error: any) {
        yield put(todoActions.addTaskError(error.message))  
    }
}

function* getTodos() {
    try {
        yield put(todoActions.toggleIsFetching(true))
        const response: TodoListItemType[] = yield call(todoApi.getTodos)        
        yield put(todoActions.getTodosSuccess(response.reverse()))
        yield put(todoActions.toggleIsFetching(false))      
    } catch (error: any) {
        yield put(todoActions.getTodosError(error.message))
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