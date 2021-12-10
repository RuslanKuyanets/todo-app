import { todoApi } from "../api/api"
import { InferActionTypes, ThunkType } from "../Types/CommonTypes"

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

enum ActionTypes {
    ADD_TASK = 'ADD-TASK',
    REMOVE_TASK = 'REMOVE-TASK',
    TOGGLE_PROGRESS = 'TOGGLE-PROGRESS',
    CHANGE_TASK = 'CHANGE-TASK',
    TOGGLE_PROGRESS_ALL = 'TOGGLE-PROGRESS-ALL',
    REMOVE_TASKS_ALL_COMPLITED = 'REMOVE-TASKS-ALL-COMPLITED',
    CHANGE_FILTER = 'CHANGE-FILTER',
    TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING',
    GET_TODOS = 'GET-TODOS'
}

export const todoReducer = (state = initialState, action: TodoActionsType ): TodoInitialStateType => {
    switch (action.type) {
        case ActionTypes.ADD_TASK:
            return {
                ...state, todoList: [action.payload ,...state.todoList]
            }
        case ActionTypes.REMOVE_TASK:
            return {...state, todoList: state.todoList.filter(task => {
                return task.id !== action.payload
            })}
        case ActionTypes.TOGGLE_PROGRESS:
            const index = state.todoList.findIndex(element => element.id === action.payload)
            const copyListToggleProgress = [...state.todoList]
            copyListToggleProgress[index].progress = !copyListToggleProgress[index].progress
            return {...state, todoList: copyListToggleProgress }
        case ActionTypes.CHANGE_TASK: 
            const indexChanged = state.todoList.findIndex(element => element.id === action.payload.id)
            const copyListChangeTask = [...state.todoList]
            copyListChangeTask[indexChanged] = action.payload 
            return {
                ...state, todoList: copyListChangeTask
            }
        case ActionTypes.TOGGLE_PROGRESS_ALL:
            return {
                ...state, progressAll: !state.progressAll, todoList: state.todoList.map(task => {
                    task.progress = !state.progressAll
                    return task
                })
            }
        case ActionTypes.REMOVE_TASKS_ALL_COMPLITED:
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
        case ActionTypes.GET_TODOS:
            return {
                ...state, todoList: action.payload
            }
        default: 
            return state
    }
}

export const todoActions = {
    addTask: (task: TodoListItemType) => {
        return {
            type: ActionTypes.ADD_TASK,
            payload: task
        } as const
    },
    removeTask: (id: string) => {
        return {
            type: ActionTypes.REMOVE_TASK,
            payload: id
        } as const
    },
    toggleProgress: (id: string) => {
        return {
            type: ActionTypes.TOGGLE_PROGRESS,
            payload: id
        } as const
    },
    changeTask: (task: TodoListItemType) => {
        return {
            type: ActionTypes.CHANGE_TASK,
            payload: task
        } as const
    },
    toggleProgressAll: () => {
        return {
            type: ActionTypes.TOGGLE_PROGRESS_ALL,
        } as const
    }, 
    removeTaskAllComplited: () => {
        return {
            type: ActionTypes.REMOVE_TASKS_ALL_COMPLITED
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
    getTodos: (todos: TodoListItemType[]) => {
        return {
            type: ActionTypes.GET_TODOS,
            payload: todos
        } as const
    }
}

export const getTodosThunkCreator = (): ThunkType<TodoActionsType> => {
    return async (dispatch) => {
        dispatch(todoActions.toggleIsFetching(true))
        const response = await todoApi.getTodos()
        dispatch(todoActions.getTodos(response.reverse()))
        dispatch(todoActions.toggleIsFetching(false))
    }
}
export const addTask = (title: string): ThunkType<TodoActionsType> => {
    return async (dispatch) => {
        const response = await todoApi.addTodo(title)
        const task = {
            title: response.title,
            id: response._id,
            progress: response.completed
        }
        dispatch(todoActions.addTask(task))
    }
}
export const removeTask = (id: string): ThunkType<TodoActionsType> => {
    return async (dispatch) => {
        const response = await todoApi.removeTodo(id)
        dispatch(todoActions.removeTask(id))
    }
}
export const changeTask = (task: TodoListItemType): ThunkType<TodoActionsType> => {
    return async (dispatch) => {
        const response = await todoApi.updateTodo(task.id, task.title)
        dispatch(todoActions.changeTask(task))
    }
}
export const toggleProgress = (task: TodoListItemType): ThunkType<TodoActionsType> => {
    return async (dispatch) => {
        const response = await todoApi.toggleProgress(task.id, task.progress)
        dispatch(todoActions.toggleProgress(task.id))
    }
}
export const toggleProgressAll = (): ThunkType<TodoActionsType> => {
    return async (dispatch, getState) => {
        const progress = getState().todo.progressAll
        const response = await todoApi.toggleProgressAll(!progress)
        dispatch(todoActions.toggleProgressAll())
    }
}
export const removeTaskAllComplited = (): ThunkType<TodoActionsType> => {
    return async (dispatch) => {
        const response = await todoApi.removeCompletedTodos()
        dispatch(todoActions.removeTaskAllComplited())
    }
}