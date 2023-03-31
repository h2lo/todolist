import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {TasksActionsType, tasksReducer} from './reducers/tasks-reducer';
import {TodolistsActionsType, todolistsReducer} from './reducers/todolists-reducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppActionsType, appReducer} from './reducers/app-reducer';
import {AuthActionsType, authReducer} from './reducers/auth-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, ActionsType>
export type ActionsType = TodolistsActionsType | TasksActionsType | AppActionsType | AuthActionsType

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
