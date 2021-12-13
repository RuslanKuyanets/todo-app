import { TodoListItemType } from '../../Redux/todo-reducer';
import Task from '../Task';

export type ListTaskPropsType = {

}

const ListTask: React.FC<ListTaskPropsType & { tasks: TodoListItemType[], changedFilter: string }> = (props) => {
    return (
        <ul>
            {props.tasks.map(task => {
                return (
                    <Task task={task}
                        key={task.id}
                    />
                )
            })
            }
        </ul>
    )
}

export default ListTask;