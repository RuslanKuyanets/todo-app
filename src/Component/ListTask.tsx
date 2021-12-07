import { TodoListItemType } from '../Redux/todo-reducer'
import Task from './Task'

export type ListTaskPropsType = {
    removeTask: (id: number) => void,
    toggleProgress: (id: number) => void,
    changeTask: (task: TodoListItemType) => void,  
}

const ListTask: React.FC<ListTaskPropsType & { filteredList: Array<TodoListItemType>, changedFilter: string }> = (props) => {
    return (
        <ul>
            {props.filteredList.map(task => {
                return (
                    <Task task={task}
                        removeTask={props.removeTask}
                        toggleProgress={props.toggleProgress}
                        changeTask={props.changeTask}
                        key={task.id}
                    />
                )
            })}
        </ul>
    )
}

export default ListTask;
