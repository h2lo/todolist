import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../../app/App';

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [
                ...state,
                newTodolist
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map((tl) => tl.id === action.todolistId
                ? {...tl, title: action.title}
                : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map((tl) => tl.id === action.todolistId
                ? {...tl, filter: action.filter}
                : tl)
        }
        default:
            return state

    }
}

//actions
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId: v1()
    } as const
}


export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todolistId
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todolistId
    } as const
}

//types
export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>