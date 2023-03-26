import React, {useCallback} from 'react';
import {Todolist} from './Todolist/Todolist'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/reducers/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from '../../state/reducers/todolists-reducer';
import {FilterValuesType, TasksStateType, TodolistType} from '../../app/App';

const TodolistsList: React.FC = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

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
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    }, [])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
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