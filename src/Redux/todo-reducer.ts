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
}

const initialState: TodoInitialStateType = {
    todoList: [],
    progressAll: false,
    changedFilter: 'all',
}

// TODO: use enums instead of hardcoded strings
export const todoReducer = (state = initialState, action: TodoActionsType ): TodoInitialStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, todoList: [action.payload, ...state.todoList] }
        case 'REMOVE-TASK':
            return {...state, todoList: state.todoList.filter(task => {
                return task.id !== action.payload
            })}
        case 'TOGGLE-PROGRESS':
            // TODO: use findIndex instead of map
            return {...state, todoList: state.todoList.map(task => {
                if(task.id === action.payload) {
                    task.progress = !task.progress
                }
                return task
            })}
        case 'CHANGE-TASK': 
            // TODO: use findIndex instead of map
            return {
                ...state, todoList: state.todoList.map(task => {
                    return task.id === action.payload.id ? action.payload : task
                })
            }
        case 'TOGGLE-PROGRESS-ALL':
            return {
                ...state, progressAll: !state.progressAll, todoList: state.todoList.map(task => {
                    task.progress = !state.progressAll
                    return task
                })
            }
        case 'REMOVE-TASKS-ALL-COMPLITED':
            return {
                ...state, todoList: state.todoList.filter(task => !task.progress)
            }
        case 'CHANGE-FILTER':
            return {
                ...state, changedFilter: action.payload, 

                // todoList: state.todoList.filter(task => {
                //     if (action.payload === 'active') {
                //         return task.progress === false
                //     }
                //     if (action.payload === 'completed') {
                //         return task.progress === true
                //     }
                //     return task
                // })
            }
        default: 
            return state
    }
}

export const todoActions = {
    addTask: (task: TodoListItemType) => {
        return {
            type: 'ADD-TASK',
            payload: task
        } as const
    },
    removeTask: (id: number) => {
        return {
            type: 'REMOVE-TASK',
            payload: id
        } as const
    },
    toggleProgress: (id: number) => {
        return {
            type: 'TOGGLE-PROGRESS',
            payload: id
        } as const
    },
    changeTask: (task: TodoListItemType) => {
        return {
            type: 'CHANGE-TASK',
            payload: task
        } as const
    },
    toggleProgressAll: () => {
        return {
            type: 'TOGGLE-PROGRESS-ALL',
        } as const
    }, 
    removeTaskAllComplited: () => {
        return {
            type: 'REMOVE-TASKS-ALL-COMPLITED'
        } as const
    },
    changeFilter: (filter: string) => {
        return {
            type: 'CHANGE-FILTER',
            payload: filter
        } as const
    }
}