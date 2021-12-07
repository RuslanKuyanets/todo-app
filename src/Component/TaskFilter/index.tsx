import { TodoListItemType } from '../../Redux/todo-reducer'
import './style.css'

export type TaskFilterType = {
    todoList: TodoListItemType[],
    removeTaskAllComplited: () => void,
    changeFilter: (filter: string) => void,
    changedFilter: string,
    setCountActiveTasks: () => number,
    namesFilters: string[],
}

const TaskFilter: React.FC<TaskFilterType> = (props) => {
    const setClassActive = (name: string) => props.changedFilter === name ? 'active' : ''
    
    const changeFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        props.changeFilter(e.currentTarget.value)
    }
    return (
        <div className='task-filter'>
            <p className='task-filter__count'>Active tasks: {props.setCountActiveTasks()}</p>
            <div className='task-filter__filters'>
                {props.namesFilters.map(filter => {
                    return <button onClick={changeFilter} className={setClassActive(filter)} value={filter}>{filter}</button>
                })}
            </div>
            <button onClick={props.removeTaskAllComplited}>Clear Completed</button>
        </div>
    )
}

export default TaskFilter