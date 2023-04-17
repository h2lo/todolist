import React, {useCallback, useEffect} from 'react';
import {Todolist} from './Todolist/Todolist'
import {AddItemForm} from 'components/AddItemForm/AddItemForm';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {addTaskTC, removeTaskTC, updateTaskTC} from 'features/TodolistsList/tasks-reducer';
import {
    addTodolistTC,
    changeTodolistTitleTC,
    FilterValuesType,
    getTodolistsTC,
    removeTodolistTC,
    todolistsActions
} from 'features/TodolistsList/todolists-reducer';
import {TaskStatuses} from 'api/todolists-api';
import {Navigate} from 'react-router-dom';
import {useAppDispatch} from 'hooks/useAppDispatch';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from 'features/auth/auth-selectors';
import {selectTodolists} from 'features/TodolistsList/todolists-selectors';
import {selectTasks} from 'features/TodolistsList/tasks-selectors';


const TodolistsList: React.FC = () => {

    const dispatch = useAppDispatch()

    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)
//---------------------------------------------------------------------------------------------------------------------

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const thunk = removeTaskTC(taskId, todolistId);
        dispatch(thunk);
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        const thunk = addTaskTC(todolistId, title);
        dispatch(thunk);
    }, [])

    const changeTaskStatus = useCallback((taskId: string, todolistId: string, newStatus: TaskStatuses) => {
        const thunk = updateTaskTC(taskId, todolistId, {status: newStatus});
        dispatch(thunk);
    }, [])

    const changeTaskTitle = useCallback((taskId: string, todolistId: string, newTitle: string) => {
        const thunk = updateTaskTC(taskId, todolistId, {title: newTitle});
        dispatch(thunk);
    }, [])
//---------------------------------------------------------------------------------------------------------------------

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

    const changeFilter = useCallback((id: string, filter: FilterValuesType) => {
        dispatch(todolistsActions.changeTodolistFilter({id, filter}))
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

    useEffect(() => {
        if (!isLoggedIn) return
        const thunk = getTodolistsTC()
        dispatch(thunk)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolist}/></Grid>
        <Grid container spacing={3}>{todolistsList}</Grid>
    </>
};

export default TodolistsList;