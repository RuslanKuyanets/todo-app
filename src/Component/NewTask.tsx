import {Field, Form, Formik} from 'formik'
import {TodoListItemType} from '../Redux/todo-reducer'
import '../Styles/taskForm.css'

export type NewTaskPropsType = {
    addTask: (task: TodoListItemType) => void,
    toggleProgress: (id: number) => void,
    toggleProgressAll: () => void,
    progressAll: boolean,
}

const validateT = (values: {task: string}) => {
    const error = {}
    return error
}

const NewTask: React.FC<NewTaskPropsType> = (props) => {
    const addTask = (values: {task: string}, {setSubmitting, resetForm}: NewTaskFormSetSubmittingType) => {
        const newTask = {
            id: Math.random(),
            task: values.task,
            progress: false
        }
        props.addTask(newTask)
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
                        <div onClick={props.toggleProgressAll} className='btn-toggleAll'>&#10097;</div>
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