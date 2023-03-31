import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from '../reducers/app-reducer';

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('error'))

    expect(endState.error).toBe('error')
})

test('correct isInitialized should be set', () => {
    const endState = appReducer(startState, setIsInitializedAC(true))

    expect(endState.isInitialized).toBe(true)
})
