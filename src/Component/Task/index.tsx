import { useState } from 'react'
import { ListTaskPropsType } from '../ListTask'
import { TodoListItemType } from '../../Redux/todo-reducer'
import EditModeForm from '../EditModeForm'
import '../../Styles/taskItem.css'

export type TaskPropsType = ListTaskPropsType & {task: TodoListItemType}

const Task: React.FC<TaskPropsType> = (props) => {

    const [editTaskMode, setEditTaskMode] = useState(false)

    const activateEditMode = () => {
        setEditTaskMode(true)
    }

    const deactivateEditMode = () => {
        setEditTaskMode(false)
    }

    const removeTask = () => {
        props.removeTask(props.task.id)
    }

    const toggleProgress = () => {
        props.toggleProgress(props.task.id)
    }
    return (
        <li className = {props.task.progress 
            ? 'list-task__task finished'
            : 'list-task__task'}>
            {props.task.progress 
                ? <span onClick = {toggleProgress} className = {'task-progress'} >&#10003;</span> 
                : <span onClick = {toggleProgress} className = {'task-progress'} ></span>} 
            {editTaskMode 
                ? <EditModeForm deactivateEditMode = {deactivateEditMode} task = {props.task} changeTask = {props.changeTask} /> 
                : <h3 onDoubleClick = {activateEditMode} className = {'task-title'}>{props.task.task}</h3>}         
            <span onClick = {removeTask} className = {'task-remove'} >&#10005;</span>
        </li>
    )
}

export default Task