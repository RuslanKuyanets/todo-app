import { Field, Form, Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { ActionTypes, TodoListItemType } from '../../Redux/todo-reducer'
import { NewTaskFormSetSubmittingType } from '../NewTask'


const validateT = (values: {task: string}) => {
    const error = {}
    return error
}

export type EditModeFormProps = {
    deactivateEditMode: () => void,
    task: TodoListItemType,
}

const EditModeForm: React.FC<EditModeFormProps> = (props) => {
    const dispatch = useDispatch()
    const changeTask = (values: {task: string}, { setSubmitting, resetForm }: NewTaskFormSetSubmittingType) => {
        let newTask = {
            id: props.task.id,
            title: values.task,
            progress: props.task.progress
        }
        dispatch({type: ActionTypes.CHANGE_TASK, payload: newTask})
        setSubmitting(false)
        props.deactivateEditMode()
    }

    return (
        <Formik
        initialValues={{ task: props.task.title }}
        validate={validateT}
        onSubmit={changeTask}
    >
        {({ isSubmitting }) => (
            <Form>
                <div className='todo-form' >
                    <Field autoFocus = {true} onBlur = {props.deactivateEditMode} type='text' name='task' className='todo-form__input editMode' placeholder='What needs to be done?'/>
                </div>
            </Form>
        )}
    </Formik>
    )
}

export default EditModeForm