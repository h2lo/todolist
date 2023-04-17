import {appActions, appReducer, InitialStateType} from 'app/app-reducer';

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('correct status should be set', () => {
    const endState = appReducer(startState, appActions.setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading')
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, appActions.setAppError({error: 'error'}))

    expect(endState.error).toBe('error')
})

test('correct isInitialized should be set', () => {
    const endState = appReducer(startState, appActions.setAppIsInitialized({isInitialized: true}))

    expect(endState.isInitialized).toBe(true)
})
