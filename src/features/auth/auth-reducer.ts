import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/app-reducer';
import {clearTasksAndTodolists} from 'common/actions';
import { handleServerAppError } from 'common/utils';
import { handleServerNetworkError } from 'common/utils';
import {ResultCode} from 'common/enums';
import {authAPI, LoginParamsType} from 'features/auth/auth-api';

const initialState = {
    isLoggedIn: false
}

export type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCEEDED) {
                    dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        authAPI.logout()
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCEEDED) {
                    dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
                    dispatch(clearTasksAndTodolists())
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

