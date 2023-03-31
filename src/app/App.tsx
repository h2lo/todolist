import React from 'react';
import './App.css';
import {BasicAppBar} from '../components/BasicAppBar/BasicAppBar';
import Container from '@mui/material/Container';
import TodolistsList from '../features/TodolistsList/TodolistsList';
import {TaskType} from '../api/todolists-api';
import {ErrorSnackBar} from '../components/ErrorSnackBar/ErrorSnackBar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    return (
        <div className="App">
            <ErrorSnackBar/>
            <BasicAppBar/>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}></Route>
                    <Route path={'/login'} element={<Login/>}></Route>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
