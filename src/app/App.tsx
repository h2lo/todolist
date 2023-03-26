import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from '../Todolist';
import {v1} from 'uuid';
import AddItemForm from '../components/AddItemForm/AddItemForm';
import BasicAppBar from '../components/BasicAppBar/BasicAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


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

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    });

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map((tl) => tl.id === todolistId
            ? {...tl, filter: value}
            : tl))
    }

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        })
    }

    const changeTaskStatus = (taskId: string, todolistID: string, newIsDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskId
                ? {...t, isDone: newIsDone}
                : t)
        })
    }
    const changeTaskTitle = (taskId: string, todolistId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((t) => t.id === taskId
                ? {...t, title: newTitle}
                : t)
        })
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((tl) => tl.id !== todolistId))
    }

    const addTodolist = (newTitle: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: newTitle, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map((tl) => tl.id === todolistId
            ? {...tl, title: newTitle}
            : tl))
    }

    const todolistsList = todolists.map((tl) => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
        }

        return (<Grid item>
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
