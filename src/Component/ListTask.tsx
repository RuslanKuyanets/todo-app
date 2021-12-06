import { isPropertySignature } from "typescript"
import { AppStatePropsType } from "../App"
import { TodoListItemType } from "../Redux/todo-reducer"
import Task from "./Task"

export type ListTaskPropsType = {
    removeTask: (id: number) => void,
    toggleProgress: (id: number) => void,
    changeTask: (task: TodoListItemType) => void,  
      
}

const ListTask: React.FC<ListTaskPropsType & {todoList: Array<TodoListItemType>, changedFilter: string}> = (props) => {

    const setFilter = () => {
        if (props.changedFilter === 'active') {
            return props.todoList.filter(task => task.progress !== true)
        } else if (props.changedFilter === 'completed') {
            return props.todoList.filter(task => task.progress !== false)
        } else {
            return props.todoList
        }
    }
    const filteredList = setFilter()

    return (
        <ul>
            {filteredList.map(task => {
                return <Task task = {task} 
                removeTask = {props.removeTask} 
                toggleProgress = {props.toggleProgress} 
                changeTask = {props.changeTask}
                key = {task.id} />
            })}
        </ul>
    )
}

export default ListTask
