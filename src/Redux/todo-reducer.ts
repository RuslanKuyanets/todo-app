import { todoApi } from "../api/api"
import { InferActionTypes, ThunkType } from "../Types/CommonTypes"
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

export type TodoActionsType = InferActionTypes<typeof todoActions> 

export type TodoListItemType = {
    id: string,
    title: string,
    progress: boolean,
}

export type TodoInitialStateType = {
    todoList: TodoListItemType[],
    progressAll: boolean,
    changedFilter: string,
    namesFilters: string[],
    isFetching: boolean
}

const initialState: TodoInitialStateType = {
    todoList: [],
    progressAll: false,
    changedFilter: 'all',
    namesFilters: ['all', 'active', 'completed'],
    isFetching: false
}

export enum ActionTypes {
    ADD_TASK_SUCCESS = 'ADD-TASK-SUCCESS',
    ADD_TASK = 'ADD-TASK',
    REMOVE_TASK_SUCCESS = 'REMOVE-TASK-SUCCESS',
    REMOVE_TASK = 'REMOVE-TASK',
    TOGGLE_PROGRESS = 'TOGGLE-PROGRESS',
    TOGGLE_PROGRESS_SUCCESS = 'TOGGLE-PROGRESS-SUCCESS',
    CHANGE_TASK_SUCCESS = 'CHANGE-TASK-SUCCESS',
    CHANGE_TASK = 'CHANGE-TASK',
    TOGGLE_PROGRESS_ALL_SUCCESS = 'TOGGLE-PROGRESS-ALL-SUCCESS',
    TOGGLE_PROGRESS_ALL = 'TOGGLE-PROGRESS-ALL',
    REMOVE_TASKS_ALL_COMPLETED_SUCCESS = 'REMOVE-TASKS-ALL-COMPLETED-SUCCESS',
    REMOVE_TASKS_ALL_COMPLETED = 'REMOVE-TASKS-ALL-COMPLETED',
    CHANGE_FILTER = 'CHANGE-FILTER',
    TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING',
    GET_TODOS_SUCCESS = 'GET-TODOS-SUCCESS',
    GET_TODOS_ERROR = 'GET-TODOS-ERROR',
    GET_TODOS = 'GET-TODOS',
}

export const todoReducer = (state = initialState, action: TodoActionsType ): TodoInitialStateType => {
    switch (action.type) {
        case ActionTypes.ADD_TASK_SUCCESS:
            return {
                ...state, todoList: [action.payload ,...state.todoList]
            }
        case ActionTypes.REMOVE_TASK_SUCCESS:
            return {...state, todoList: state.todoList.filter(task => {
                return task.id !== action.payload
            })}
        case ActionTypes.TOGGLE_PROGRESS_SUCCESS:
            const index = state.todoList.findIndex(element => element.id === action.payload)
            const copyListToggleProgress = [...state.todoList]
            copyListToggleProgress[index].progress = !copyListToggleProgress[index].progress
            return {...state, todoList: copyListToggleProgress }
        case ActionTypes.CHANGE_TASK_SUCCESS: 
            const indexChanged = state.todoList.findIndex(element => element.id === action.payload.id)
            const copyListChangeTask = [...state.todoList]
            copyListChangeTask[indexChanged] = action.payload 
            return {
                ...state, todoList: copyListChangeTask
            }
        case ActionTypes.TOGGLE_PROGRESS_ALL_SUCCESS:
            return {
                ...state, progressAll: !state.progressAll, todoList: state.todoList.map(task => {
                    task.progress = !state.progressAll
                    return task
                })
            }
        case ActionTypes.REMOVE_TASKS_ALL_COMPLETED_SUCCESS:
            return {
                ...state, todoList: state.todoList.filter(task => !task.progress)
            }
        case ActionTypes.CHANGE_FILTER:
            return {
                ...state, changedFilter: action.payload, 
            }
        case ActionTypes.TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.payload
            }
        case ActionTypes.GET_TODOS_SUCCESS:
            return {
                ...state, todoList: action.payload
            }
        default: 
            return state
    }
}

export const todoActions = {
    addTaskSuccess: (task: TodoListItemType) => {
        return {
            type: ActionTypes.ADD_TASK_SUCCESS,
            payload: task
        } as const
    },
    addTask: (title: string) => {
        return {
            type: ActionTypes.ADD_TASK,
            payload: title
        } as const
    },
    removeTaskSuccess: (id: string) => {
        return {
            type: ActionTypes.REMOVE_TASK_SUCCESS,
            payload: id
        } as const
    },
    removeTask: (id: string) => {
        return {
            type: ActionTypes.REMOVE_TASK,
            payload: id
        } as const
    },
    toggleProgressSuccess: (id: string) => {
        return {
            type: ActionTypes.TOGGLE_PROGRESS_SUCCESS,
            payload: id
        } as const
    },
    toggleProgres: (id: string) => {
        return {
            type: ActionTypes.TOGGLE_PROGRESS,
            payload: id
        } as const
    },
    changeTaskSuccess: (task: TodoListItemType) => {
        return {
            type: ActionTypes.CHANGE_TASK_SUCCESS,
            payload: task
        } as const
    },
    changeTast: (task: TodoListItemType) => {
        return {
            type: ActionTypes.CHANGE_TASK,
            payload: task
        } as const
    },
    toggleProgressAllSuccess: () => {
        return {
            type: ActionTypes.TOGGLE_PROGRESS_ALL_SUCCESS,
        } as const
    }, 
    toggleProgressAll: (progress: boolean) => {
        return {
            type: ActionTypes.TOGGLE_PROGRESS_ALL,
            payload: progress
        } as const
    }, 
    removeTaskAllCompletedSuccess: () => {
        return {
            type: ActionTypes.REMOVE_TASKS_ALL_COMPLETED_SUCCESS
        } as const
    },
    changeFilter: (filter: string) => {
        return {
            type: ActionTypes.CHANGE_FILTER,
            payload: filter
        } as const
    },
    toggleIsFetching: (isFetching: boolean) => {
        return {
            type: ActionTypes.TOGGLE_IS_FETCHING,
            payload: isFetching
        } as const
    },
    getTodosSuccess: (todos: TodoListItemType[]) => {
        return {
            type: ActionTypes.GET_TODOS_SUCCESS,
            payload: todos
        } as const
    },    
    getTodosError: (error: 'string') => {
        return {
            type: ActionTypes.GET_TODOS_ERROR,
            payload: error
        } as const
    },
}

function* fetchRemoveCompletedTodos() {
    try {
        yield call(todoApi.removeCompletedTodos)      
        yield put(todoActions.removeTaskAllCompletedSuccess())      
    } catch (e) {
       console.log(e)
    }
}

function* fetchToggleProgressAll(action: {type: string, payload: boolean}) {
    try {      
        yield call(todoApi.toggleProgressAll, !action.payload)        
        yield put(todoActions.toggleProgressAllSuccess())
    } catch (error: any) {
        yield put(todoActions.getTodosError(error.message))
    }
}

function* fetchToggleProgressTodo(action: {type: string, payload: TodoListItemType}) {
    try {
        yield call(todoApi.toggleProgress, action.payload.id, action.payload.progress)      
        yield put(todoActions.toggleProgressSuccess(action.payload.id))       
    } catch (e) {
       console.log(e)
    }
}

function* fetchChangeTodo(action: {type: string, payload: TodoListItemType}) {
    try {
        yield call(todoApi.updateTodo, action.payload.id, action.payload.title)      
        yield put(todoActions.changeTaskSuccess(action.payload))          
    } catch (e) {
       console.log(e)
    }
}

function* fetchRemoveTodo(action: {type: string, payload: string}) {
    try {
        yield call(todoApi.removeTodo, action.payload)      
        yield put(todoActions.removeTaskSuccess(action.payload))         
    } catch (e) {
       console.log(e)
    }
}

function* fetchAddTodo(action: {type: string, payload: string}) {
    try {
        const response: TodoListItemType = yield call(todoApi.addTodo, action.payload)      
        yield put(todoActions.addTaskSuccess(response))      
    } catch (e) {
       console.log(e)
    }
}

function* fetchGetTodo() {
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
    yield takeEvery(ActionTypes.GET_TODOS, fetchGetTodo);
    yield takeEvery(ActionTypes.ADD_TASK, fetchAddTodo);
    yield takeEvery(ActionTypes.REMOVE_TASK, fetchRemoveTodo);
    yield takeEvery(ActionTypes.CHANGE_TASK, fetchChangeTodo);
    yield takeEvery(ActionTypes.TOGGLE_PROGRESS, fetchToggleProgressTodo);
    yield takeEvery(ActionTypes.TOGGLE_PROGRESS_ALL, fetchToggleProgressAll);
    yield takeEvery(ActionTypes.REMOVE_TASKS_ALL_COMPLETED, fetchRemoveCompletedTodos);
}
