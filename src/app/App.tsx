import React, {useEffect} from 'react';
import './App.css';
import {BasicAppBar} from 'components/BasicAppBar/BasicAppBar';
import Container from '@mui/material/Container';
import TodolistsList from '../features/TodolistsList/TodolistsList';
import {ErrorSnackBar} from 'components/ErrorSnackBar/ErrorSnackBar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from 'features/auth/Login';
import CircularProgress from '@mui/material/CircularProgress';
import {initializeAppTC} from 'app/app-reducer';
import {useAppDispatch} from 'hooks/useAppDispatch';
import {selectIsInitialized} from 'app/app-selectors';
import {useSelector} from 'react-redux';

function App() {

    const dispatch = useAppDispatch()

    const isInitialized = useSelector(selectIsInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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
