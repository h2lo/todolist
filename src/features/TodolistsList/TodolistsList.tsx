import React, {useCallback, useEffect} from 'react';
import {Todolist} from './Todolist/Todolist'
import {AddItemForm} from 'common/components';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {tasksThunks} from 'features/TodolistsList/tasks-reducer';
import {FilterValuesType, todolistsActions, todolistsThunks} from 'features/TodolistsList/todolists-reducer';
import {Navigate} from 'react-router-dom';
import {useAppDispatch} from 'common/hooks/useAppDispatch';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from 'features/auth/auth-selectors';
import {selectTodolists} from 'features/TodolistsList/todolists-selectors';
import {selectTasks} from 'features/TodolistsList/tasks-selectors';
import {TaskStatuses} from 'common/enums';

const TodolistsList = () => {

    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(todolistsThunks.getTodolists())
    }, [])
//---------------------------------------------------------------------------------------------------------------------

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(tasksThunks.removeTask({taskId, todolistId}));
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(tasksThunks.addTask({todolistId, title}));
    }, [])

    const changeTaskStatus = useCallback((taskId: string, todolistId: string, status: TaskStatuses) => {
        dispatch(tasksThunks.updateTask({taskId, todolistId, domainModel: {status}}));
    }, [])

    const changeTaskTitle = useCallback((taskId: string, todolistId: string, title: string) => {
        dispatch(tasksThunks.updateTask({taskId, todolistId, domainModel: {title}}));
    }, [])
//---------------------------------------------------------------------------------------------------------------------

    const removeTodolist = useCallback((id: string) => {
        dispatch(todolistsThunks.removeTodolist(id))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(todolistsThunks.addTodolist(title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(todolistsThunks.changeTodolistTitle({id, title}))
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

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolist}/></Grid>
        <Grid container spacing={3}>{todolistsList}</Grid>
    </>
};

export default TodolistsList;