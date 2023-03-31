import {authAPI, LoginParamsType, ResultCode} from '../../api/todolists-api';
import {setAppStatusAC} from './app-reducer';
import {ActionsType} from '../store';
import {Dispatch} from 'redux';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}

// thunks
export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCEEDED) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

// types
export type SetIsLoggedType = ReturnType<typeof setIsLoggedInAC>

export type AuthActionsType = SetIsLoggedType