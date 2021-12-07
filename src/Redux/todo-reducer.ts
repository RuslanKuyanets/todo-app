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

const getIndexById = (id: number, array: TodoListItemType[]) => {
    const index = array.findIndex(element => {
        return element.id === id
    })
    return index
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
            let index = getIndexById(action.payload, state.todoList)
            let currentProgress = state.todoList[index].progress
            state.todoList[index].progress = !currentProgress
            return {...state, todoList: [...state.todoList ]}
        case 'CHANGE-TASK': 
            let indexChanged = getIndexById(action.payload.id, state.todoList)
            state.todoList[indexChanged] = action.payload 
            return {
                ...state, todoList: [...state.todoList ]
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