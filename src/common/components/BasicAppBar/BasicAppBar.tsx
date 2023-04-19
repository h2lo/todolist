import * as React from 'react';
import {useCallback} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LinearProgress} from '@mui/material';
import {logoutTC} from 'features/auth/auth-reducer';
import {useAppDispatch} from 'common/hooks/useAppDispatch';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from 'features/auth/auth-selectors';
import {selectStatus} from 'app/app-selectors';


export const BasicAppBar = () => {

    const dispatch = useAppDispatch()

    const status = useSelector(selectStatus)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const logOutHandler = useCallback(() => {
        const thunk = logoutTC()
        dispatch(thunk)
    },[])

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
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/>}
            </AppBar>
        </Box>
    );
}

