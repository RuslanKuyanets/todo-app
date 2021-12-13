import { useState } from 'react'
import { ListTaskPropsType } from '../ListTask'
import { ActionTypes, TodoListItemType } from '../../Redux/todo-reducer'
import EditModeForm from '../EditModeForm'
import '../../Styles/taskItem.css'
import { useDispatch } from 'react-redux'

export type TaskPropsType = ListTaskPropsType & {task: TodoListItemType}

const Task: React.FC<TaskPropsType> = (props) => {
    const dispatch = useDispatch()
    const [editTaskMode, setEditTaskMode] = useState(false)
    const activateEditMode = () => {
        setEditTaskMode(true)
    }
    const deactivateEditMode = () => {
        setEditTaskMode(false)
    }
    return (
        <li className = {props.task.progress 
            ? 'list-task__task finished'
            : 'list-task__task'}>
            {props.task.progress 
                ? <span onClick = {() => dispatch({type: ActionTypes.TOGGLE_PROGRESS, payload: props.task}) } className = {'task-progress'} >&#10003;</span> 
                : <span onClick = {() => dispatch({type: ActionTypes.TOGGLE_PROGRESS, payload: props.task}) } className = {'task-progress'} ></span>} 
            {editTaskMode 
                ? <EditModeForm deactivateEditMode = {deactivateEditMode} task = {props.task} /> 
                : <h3 onDoubleClick = {activateEditMode} className = {'task-title'}>{props.task.title}</h3>}         
            <span onClick = {() => dispatch({type: ActionTypes.REMOVE_TASK, payload: props.task.id}) } className = {'task-remove'} >&#10005;</span>
        </li>
    )
}

export default Task