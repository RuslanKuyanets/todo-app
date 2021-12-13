import { InferActionTypes } from "../Types/CommonTypes"

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
    REMOVE_COMPLETED_SUCCESS = 'REMOVE-COMPLETED-SUCCESS',
    REMOVE_COMPLETED = 'REMOVE-COMPLETED',
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
        case ActionTypes.REMOVE_COMPLETED_SUCCESS:
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
    addTask: (title: string) => {
        return {
            type: ActionTypes.ADD_TASK,
            payload: title
        } as const
    },
    addTaskSuccess: (task: TodoListItemType) => {
        return {
            type: ActionTypes.ADD_TASK_SUCCESS,
            payload: task
        } as const
    },
    addTaskError: (error: 'string') => {
        return {
            type: ActionTypes.GET_TODOS_ERROR,
            payload: error
        } as const
    },
    removeTask: (id: string) => {
        return {
            type: ActionTypes.REMOVE_TASK,
            payload: id
        } as const
    },    
    removeTaskSuccess: (id: string) => {
        return {
            type: ActionTypes.REMOVE_TASK_SUCCESS,
            payload: id
        } as const
    },
    removeTaskError: (error: 'string') => {
        return {
            type: ActionTypes.GET_TODOS_ERROR,
            payload: error
        } as const
    },
    toggleProgress: (id: string) => {
        return {
            type: ActionTypes.TOGGLE_PROGRESS,
            payload: id
        } as const
    },    
    toggleProgressSuccess: (id: string) => {
        return {
            type: ActionTypes.TOGGLE_PROGRESS_SUCCESS,
            payload: id
        } as const
    },
    toggleProgressError: (error: 'string') => {
        return {
            type: ActionTypes.GET_TODOS_ERROR,
            payload: error
        } as const
    },
    changeTast: (task: TodoListItemType) => {
        return {
            type: ActionTypes.CHANGE_TASK,
            payload: task
        } as const
    },    
    changeTaskSuccess: (task: TodoListItemType) => {
        return {
            type: ActionTypes.CHANGE_TASK_SUCCESS,
            payload: task
        } as const
    },
    changeTaskError: (error: 'string') => {
        return {
            type: ActionTypes.GET_TODOS_ERROR,
            payload: error
        } as const
    },
    toggleProgressAll: (progress: boolean) => {
        return {
            type: ActionTypes.TOGGLE_PROGRESS_ALL,
            payload: progress
        } as const
    },     
    toggleProgressAllSuccess: () => {
        return {
            type: ActionTypes.TOGGLE_PROGRESS_ALL_SUCCESS,
        } as const
    }, 
    toggleProgressAllError: (error: 'string') => {
        return {
            type: ActionTypes.GET_TODOS_ERROR,
            payload: error
        } as const
    },
    removeCompletedSuccess: () => {
        return {
            type: ActionTypes.REMOVE_COMPLETED_SUCCESS
        } as const
    },
    removeCompletedError: (error: 'string') => {
        return {
            type: ActionTypes.GET_TODOS_ERROR,
            payload: error
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
}