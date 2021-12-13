import { useDispatch } from 'react-redux'
import { ActionTypes, TodoListItemType } from '../../Redux/todo-reducer'
import './style.css'

export type TaskFilterType = {
    todoList: TodoListItemType[],
    changeFilter: (filter: string) => void,
    changedFilter: string,
    activeTasksCount: number,
    namesFilters: string[],
}

const TaskFilter: React.FC<TaskFilterType> = (props) => {
    const dispatch = useDispatch()
    const setClassActive = (name: string) => props.changedFilter === name ? 'active' : ''
    
    const changeFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        props.changeFilter(e.currentTarget.value)
    }
    return (
        <div className='task-filter'>
            <p className='task-filter__count'>Active tasks: {props.activeTasksCount}</p>
            <div className='task-filter__filters'>
                {props.namesFilters.map(filter => {
                    return <button key = {filter} onClick={changeFilter} className={setClassActive(filter)} value={filter}>{filter}</button>
                })}
            </div>
            <button onClick={() => dispatch({type: ActionTypes.REMOVE_TASKS_ALL_COMPLETED})}>Clear Completed</button>
        </div>
    )
}

export default TaskFilter