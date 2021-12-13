import {Field, Form, Formik} from 'formik'
import { useDispatch } from 'react-redux'
import { ActionTypes, TodoListItemType } from '../../Redux/todo-reducer'
import '../../Styles/taskForm.css'

export type NewTaskPropsType = {
    progressAll: boolean,
}

const validateT = (values: {task: string}) => {
    const error = {}
    return error
}

const NewTask: React.FC<NewTaskPropsType> = (props) => {
    const dispatch = useDispatch()
    const addTask = (values: {task: string}, {setSubmitting, resetForm}: NewTaskFormSetSubmittingType) => {
        dispatch({type: ActionTypes.ADD_TASK, payload: values.task})
        setSubmitting(false)
        resetForm()
    }

    return (
        <Formik
            initialValues={{task: ''}}
            validate={validateT}
            onSubmit={addTask}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className='todo-form'>
                        <div onClick={() => dispatch({type: ActionTypes.TOGGLE_PROGRESS_ALL, payload: props.progressAll})} className='btn-toggleAll'>&#10097;</div>
                        <Field type='text' name='task' className='todo-form__input' placeholder='What needs to be done?'/>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export type NewTaskFormSetSubmittingType = {
    setSubmitting: (isSubmitting: boolean) => void,
    resetForm: () => void,
}

export default NewTask