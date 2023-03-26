import React from 'react';
import './App.css';
import {TaskType, Todolist} from '../Todolist';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import BasicAppBar from '../components/BasicAppBar/BasicAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {AppRootStateType} from '../state/store';
import {useDispatch, useSelector} from 'react-redux';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from '../state/reducers/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/reducers/tasks-reducer';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId);
        dispatch(action);
    }

    const addTask = (todolistId: string, title: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }

    const changeTaskStatus = (taskId: string, todolistId: string, newIsDone: boolean) => {
        const action = changeTaskStatusAC(taskId, newIsDone, todolistId);
        dispatch(action);

    }
    const changeTaskTitle = (taskId: string, todolistId: string, newTitle: string) => {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatch(action);
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }

    const todolistsList = todolists.map((tl) => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
        }

        return (<Grid key={tl.id} item>
                <Paper style={{padding: '18px'}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        filter={tl.filter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <BasicAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}> <AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={3}>{todolistsList}</Grid>
            </Container>
        </div>
    );
}

export default App;
