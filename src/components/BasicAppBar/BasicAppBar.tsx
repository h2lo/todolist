import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LinearProgress} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../state/store';
import {RequestStatusType} from '../../state/reducers/app-reducer';
import {logoutTC} from '../../state/reducers/auth-reducer';


export const BasicAppBar = () => {

    const dispatch = useAppDispatch()

    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)

    const logOutHandler = () => {
        const thunk = logoutTC()
        dispatch(thunk)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
        </Box>
    );
}

