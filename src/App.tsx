import React from 'react';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import  store,{  AppStateType, persistor } from './Redux/store';
import { todoActions, TodoListItemType } from './Redux/todo-reducer';
import NewTask from './Component/NewTask';
import ListTask from './Component/ListTask';
import TaskFilter from './Component/TaskFilter';
import './App.css';

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
  
  return (
    <div className='App'>
      <h1 className='app-title'>todos</h1>
      <NewTask 
        progressAll={props.progressAll} 
        addTask = {props.addTask} 
        toggleProgress = {props.toggleProgress} 
        toggleProgressAll = {props.toggleProgressAll}
      />
      <ListTask
        changedFilter={props.changedFilter}
        tasks={getFilteredTasks()}
        removeTask={props.removeTask}
        toggleProgress={props.toggleProgress}
        changeTask={props.changeTask}
      />
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
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  )
}

const mapStateToProps = (state: AppStateType): AppStatePropsType => {
  return {
    todoList: state.todo.todoList,
    progressAll: state.todo.progressAll,
    changedFilter: state.todo.changedFilter,
    namesFilters: state.todo.namesFilters,
  }
}

const AppContainer = connect(mapStateToProps, { 
  addTask: todoActions.addTask, 
  removeTask: todoActions.removeTask, 
  toggleProgress: todoActions.toggleProgress,
  changeTask: todoActions.changeTask,
  toggleProgressAll: todoActions.toggleProgressAll,
  removeTaskAllComplited: todoActions.removeTaskAllComplited,
  changeFilter: todoActions.changeFilter 
})(App)

export type AppStatePropsType = {
  todoList: TodoListItemType[],
  progressAll: boolean,
  changedFilter: string,
  namesFilters: string[],
}
export type AppDispatchPropsType = {
  addTask: (task: TodoListItemType) => void,
  removeTask: (id: number) => void,
  toggleProgress: (id: number) => void,
  changeTask: (task: TodoListItemType) => void,
  toggleProgressAll: () => void,
  removeTaskAllComplited: () => void,
  changeFilter: (filter: string) => void
}

export default AppMain;