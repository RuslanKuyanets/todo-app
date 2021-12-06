import React from 'react';
import './App.css';
import NewTask from './Component/NewTask';
import ListTask from './Component/ListTask';
import { Provider, connect } from 'react-redux';
import store, { AppStateType } from './Redux/store';
import { todoActions, TodoListItemType } from './Redux/todo-reducer';
import TaskFilter from './Component/TaskFilter';

const App: React.FC<AppStatePropsType & AppDispatchPropsType> = (props) => {
  
  return (
    <div className="App">
      <h1 className = {'app-title'} >todos</h1>
      <NewTask progressAll = {props.progressAll} addTask = {props.addTask} toggleProgress = {props.toggleProgress} toggleProgressAll = {props.toggleProgressAll}/>
      <ListTask changedFilter = {props.changedFilter} todoList = {props.todoList} removeTask = {props.removeTask} toggleProgress = {props.toggleProgress} changeTask = {props.changeTask} />
      {props.todoList.length > 0 && <TaskFilter changedFilter = {props.changedFilter} changeFilter = {props.changeFilter} removeTaskAllComplited = {props.removeTaskAllComplited} todoList = {props.todoList} /> }
    </div>
  );
}

const AppMain: React.FC = () => {
  return (
    <Provider store = {store}>
      <AppContainer />
    </Provider>
  )
}

const mapStateToProps = (state: AppStateType): AppStatePropsType => {
  return {
    todoList: state.todo.todoList,
    progressAll: state.todo.progressAll,
    changedFilter: state.todo.changedFilter
  }
}

const AppContainer = connect(mapStateToProps, { addTask: todoActions.addTask, 
  removeTask: todoActions.removeTask, 
  toggleProgress: todoActions.toggleProgress,
  changeTask: todoActions.changeTask,
  toggleProgressAll: todoActions.toggleProgressAll,
  removeTaskAllComplited: todoActions.removeTaskAllComplited,
  changeFilter: todoActions.changeFilter }) (App)

export default AppMain;


export type AppStatePropsType = {
  todoList: Array<TodoListItemType>
  progressAll: boolean
  changedFilter: string
}
export type AppDispatchPropsType = {
  addTask: (task: TodoListItemType) => void,
  removeTask: (id: number) => void,
  toggleProgress: (id: number) => void,
  changeTask: (task: TodoListItemType) => void,
  toggleProgressAll: () => void,
  removeTaskAllComplited: () => void
  changeFilter: (filter: string) => void
}