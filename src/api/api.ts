import axios from "axios"

const BASE_URL = 'http://localhost:5000/api/todos'

export type ApiGetTodosType = {
    title: string,
    _id: string,
    completed: boolean,
    __v: number
}

export const todoApi = {
    getTodos() {
        return axios.get<ApiGetTodosType[]>(BASE_URL).then(data => {
            return data.data.map(elem => {
                return {
                    title: elem.title,
                    id: elem._id,
                    progress: elem.completed
                }
            })
        })
    },
    addTodo(title: string) {
        return axios.post(BASE_URL, {title: title}).then(data => {
            return {
                title: data.data.title,
                id: data.data._id,
                progress: data.data.completed
            }
        })
    },
    removeTodo(id: string) {
        return axios.delete(BASE_URL + `/${id}`)
    }, 
    updateTodo(id: string, title: string) {
        return axios.put(BASE_URL + `/${id}`, {title: title})
    },
    toggleProgress(id: string, progress: boolean) {
        return axios.put(BASE_URL + `/${id}`, {completed: !progress})
    },
    toggleProgressAll(progress: boolean) {
        return axios.put(BASE_URL, {completed: progress})
    },
    removeCompletedTodos() {
        return axios.delete(BASE_URL)
    }, 
}