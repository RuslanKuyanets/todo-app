import React from 'react';
import { Provider, connect } from 'react-redux';
import store, { AppStateType } from './Redux/store';
import { todoActions, TodoListItemType } from './Redux/todo-reducer';
import NewTask from './Component/NewTask';
import ListTask from './Component/ListTask';
import TaskFilter from './Component/TaskFilter';
import './App.css';

const App: React.FC<AppStatePropsType & AppDispatchPropsType> = (props) => {
  const setCountActiveTasks = () => {
    const count = props.todoList.reduce((sum, task) => {
        if(!task.progress) {
            return sum + 1
        }
        return sum
    }, 0)
    return count
  }
  const countActiveTasks = setCountActiveTasks()
  const setFilter = () => {
    if (props.changedFilter === 'active') {
        return props.todoList.filter(task => !task.progress)
    } else if (props.changedFilter === 'completed') {
        return props.todoList.filter(task => task.progress)
    } else {
        return props.todoList
    }
  }
  const filteredList = setFilter()
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
        filteredList={filteredList}
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
          countActiveTasks = {countActiveTasks}
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