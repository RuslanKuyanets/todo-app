import React, { useEffect } from 'react';
import { Provider, connect, useDispatch } from 'react-redux';
import  store,{  AppStateType } from './Redux/store';
import { ActionTypes, todoActions, TodoListItemType } from './Redux/todo-reducer';
import NewTask from './Component/NewTask';
import ListTask from './Component/ListTask';
import TaskFilter from './Component/TaskFilter';
import './App.css';
import Preloader from './Component/Preloader/Preloader';

const App: React.FC<AppStatePropsType & AppDispatchPropsType> = (props) => {
  const dispatch = useDispatch()
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
    dispatch({type: ActionTypes.GET_TODOS})
  },[])

  return (
    <div className='App'>
      <h1 className='app-title'>todos</h1>
      <NewTask 
        progressAll={props.progressAll} 
      />
      {props.isFetching ? <Preloader/> : <ListTask
        changedFilter={props.changedFilter}
        tasks={getFilteredTasks()}
      />}

      {props.todoList.length > 0
        && <TaskFilter
          changedFilter={props.changedFilter}
          changeFilter={props.changeFilter}
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
  changeFilter: todoActions.changeFilter,
})(App)

export type AppStatePropsType = {
  todoList: TodoListItemType[],
  progressAll: boolean,
  changedFilter: string,
  namesFilters: string[],
  isFetching: boolean,
}
export type AppDispatchPropsType = {
  changeFilter: (filter: string) => void,
}

export default AppMain;