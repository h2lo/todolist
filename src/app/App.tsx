import React from 'react';
import './App.css';
import BasicAppBar from '../components/BasicAppBar/BasicAppBar';
import Container from '@mui/material/Container';
import TodolistsList from '../features/TodolistsList/TodolistsList';
import {TaskType} from '../api/todolists-api';


export type FilterValuesType = 'all' | 'active' | 'completed';
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
