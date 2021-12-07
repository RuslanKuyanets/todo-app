import { TodoListItemType } from '../Redux/todo-reducer'

export type TaskFilterType = {
    todoList: Array<TodoListItemType>,
    removeTaskAllComplited: () => void,
    changeFilter: (filter: string) => void,
    changedFilter: string,
}

const TaskFilter: React.FC<TaskFilterType> = (props) => {

    const clsBtnFilter = (name: string) => {
        if(props.changedFilter === name) return 'active'
    }

    const changeFilter = (e: any) => {
        e.preventDefault()
        props.changeFilter(e.currentTarget.value)
    }

    // TODO: use reduce instead of filter
    const countActiveTasks = () => {
        const count = props.todoList.filter(task => !task.progress)
        return count.length
    }

    return (
        <div className='task-filter'>
            <p className='task-filter__count'>Active tasks: {countActiveTasks()}</p>
            <div className='task-filter__filters'>
                <button onClick={changeFilter} className={clsBtnFilter('all')} value='all' >All</button>
                <button onClick={changeFilter} className={clsBtnFilter('active')} value='active'>Active</button>
                <button onClick={changeFilter} className={clsBtnFilter('completed')} value='completed'>Completed</button>
            </div>
            <button onClick={props.removeTaskAllComplited}>Clear Completed</button>
        </div>
    )
}

export default TaskFilter