import React from 'react';
import './App.css';
import {TaskType} from '../features/TodolistsList/Todolist/Todolist';
import BasicAppBar from '../components/BasicAppBar/BasicAppBar';
import Container from '@mui/material/Container';
import TodolistsList from '../features/TodolistsList/TodolistsList';


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

    return (
        <div className="App">
            <BasicAppBar/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;
