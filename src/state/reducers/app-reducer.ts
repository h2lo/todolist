export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
export const setAppErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}
export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZED',
        isInitialized
    } as const
}

// types
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

export type AppActionsType = SetAppStatusType | SetAppErrorType | SetIsInitializedActionType
