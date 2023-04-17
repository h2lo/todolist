import {Dispatch} from 'redux';
import {authAPI, ResultCode} from 'api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authActions} from 'features/auh/auth-reducer';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions

//thunks
export const initializeAppTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        authAPI.me()
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
            .finally(() => {
                dispatch(appActions.setAppIsInitialized({isInitialized: true}))
            })
    }
}
