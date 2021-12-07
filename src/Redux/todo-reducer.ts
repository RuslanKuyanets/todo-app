import { InferActionTypes } from "../Types/CommonTypes"

export type TodoActionsType = InferActionTypes<typeof todoActions> 

export type TodoListItemType = {
    id: number,
    task: string,
    progress: boolean,
}

export type TodoInitialStateType = {
    todoList: TodoListItemType[],
    progressAll: boolean,
    changedFilter: string,
    namesFilters: string[],
}

const initialState: TodoInitialStateType = {
    todoList: [],
    progressAll: false,
    changedFilter: 'all',
    namesFilters: ['all', 'active', 'completed'],
}

enum ActionTypes {
    ADD_TASK = 'ADD-TASK',
    REMOVE_TASK = 'REMOVE-TASK',
    TOGGLE_PROGRESS = 'TOGGLE-PROGRESS',
    CHANGE_TASK = 'CHANGE-TASK',
    TOGGLE_PROGRESS_ALL = 'TOGGLE-PROGRESS-ALL',
    REMOVE_TASKS_ALL_COMPLITED = 'REMOVE-TASKS-ALL-COMPLITED',
    CHANGE_FILTER = 'CHANGE-FILTER',
}

export const todoReducer = (state = initialState, action: TodoActionsType ): TodoInitialStateType => {
    switch (action.type) {
        
        case ActionTypes.ADD_TASK:
            return {...state, todoList: [action.payload, ...state.todoList] }
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
    removeTask: (id: number) => {
        return {
            type: ActionTypes.REMOVE_TASK,
            payload: id
        } as const
    },
    toggleProgress: (id: number) => {
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
    }
}