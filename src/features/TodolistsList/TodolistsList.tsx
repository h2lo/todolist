import React, {useCallback, useEffect} from 'react';
import {Todolist} from './Todolist/Todolist'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/reducers/tasks-reducer';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    getTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from '../../state/reducers/todolists-reducer';
import {FilterValuesType, TasksStateType} from '../../app/App';


const TodolistsList: React.FC = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch()

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId);
        dispatch(action);
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, [])

    const changeTaskStatus = useCallback((taskId: string, todolistId: string, newIsDone: boolean) => {
        const action = changeTaskStatusAC(taskId, newIsDone, todolistId);
        dispatch(action);
    }, [])

    const changeTaskTitle = useCallback((taskId: string, todolistId: string, newTitle: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatch(action);
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistTC(todolistId)
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const thunk = changeTodolistTitleTC(todolistId, newTitle)
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    useEffect(() => {
        const thunk = getTodolistsTC()
        dispatch(thunk)
    }, [])

    const todolistsList = todolists.map(tl => {

        let allTodolistTasks = tasks[tl.id]

        return <Grid item key={tl.id}>
            <Paper style={{padding: '10px'}}>
                <Todolist
                    todolist={tl}
                    tasks={allTodolistTasks}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeFilter={changeFilter}
                />
            </Paper>
        </Grid>
    })

    return <>
        <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolist}/></Grid>
        <Grid container spacing={3}>{todolistsList}</Grid>
    </>
};

export default TodolistsList;