import React, { useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import  store,{  AppStateType } from './Redux/store';
import { addTask, changeTask, getTodosThunkCreator, removeTask, removeTaskAllComplited, todoActions, TodoListItemType, toggleProgress, toggleProgressAll } from './Redux/todo-reducer';
import NewTask from './Component/NewTask';
import ListTask from './Component/ListTask';
import TaskFilter from './Component/TaskFilter';
import './App.css';
import Preloader from './Component/Preloader/Preloader';

const App: React.FC<AppStatePropsType & AppDispatchPropsType> = (props) => {
  const getCountActiveTasks = () => props.todoList.reduce((sum, task) => !task.progress ? sum + 1 : sum, 0)
  
  const getFilteredTasks = () => {
    if (props.changedFilter === 'active') {
        return props.todoList.filter(task => !task.progress)
    } else if (props.changedFilter === 'completed') {
        return props.todoList.filter(task => task.progress)
    } else {
        return props.todoList
    }
  }
  
  useEffect(() => {
    props.getTodos()
  },[])

  return (
    <div className='App'>
      <h1 className='app-title'>todos</h1>
      <NewTask 
        progressAll={props.progressAll} 
        addTask = {props.addTask} 
        toggleProgressAll = {props.toggleProgressAll}
      />
      {props.isFetching ? <Preloader/> : <ListTask
        changedFilter={props.changedFilter}
        tasks={getFilteredTasks()}
        removeTask={props.removeTask}
        toggleProgress={props.toggleProgress}
        changeTask={props.changeTask}
      />}

      {props.todoList.length > 0
        && <TaskFilter
          changedFilter={props.changedFilter}
          changeFilter={props.changeFilter}
          removeTaskAllComplited={props.removeTaskAllComplited}
          todoList={props.todoList}
          activeTasksCount={getCountActiveTasks()}
          namesFilters = {props.namesFilters}
        />
      }
    </div>
  );
}

const AppMain: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

const mapStateToProps = (state: AppStateType): AppStatePropsType => {
  return {
    todoList: state.todo.todoList,
    progressAll: state.todo.progressAll,
    changedFilter: state.todo.changedFilter,
    namesFilters: state.todo.namesFilters,
    isFetching: state.todo.isFetching,
  }
}

const AppContainer = connect(mapStateToProps, { 
  addTask: addTask, 
  removeTask: removeTask, 
  toggleProgress: toggleProgress,
  changeTask: changeTask,
  toggleProgressAll: toggleProgressAll,
  removeTaskAllComplited: removeTaskAllComplited,
  changeFilter: todoActions.changeFilter,
  getTodos: getTodosThunkCreator
})(App)

export type AppStatePropsType = {
  todoList: TodoListItemType[],
  progressAll: boolean,
  changedFilter: string,
  namesFilters: string[],
  isFetching: boolean,
}
export type AppDispatchPropsType = {
  addTask: (title: string) => void,
  removeTask: (id: string) => void,
  toggleProgress: (task: TodoListItemType) => void,
  changeTask: (task: TodoListItemType) => void,
  toggleProgressAll: () => void,
  removeTaskAllComplited: () => void,
  changeFilter: (filter: string) => void,
  getTodos: () => void
}

export default AppMain;