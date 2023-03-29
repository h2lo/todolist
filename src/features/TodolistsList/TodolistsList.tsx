import React, {useCallback, useEffect} from 'react';
import {Todolist} from './Todolist/Todolist'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../state/store';
import {addTaskTC, removeTaskTC, updateTaskTC} from '../../state/reducers/tasks-reducer';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    getTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from '../../state/reducers/todolists-reducer';
import {FilterValuesType, TasksStateType} from '../../app/App';
import {TaskStatuses} from '../../api/todolists-api';


const TodolistsList: React.FC = () => {

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch()
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