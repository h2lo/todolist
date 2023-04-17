import {authActions, authReducer, InitialStateType} from 'features/auth/auth-reducer';

let startState: InitialStateType

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('correct isLoggedIn should be set', () => {
    const endState = authReducer(startState, authActions.setIsLoggedIn({isLoggedIn: true}))

    expect(endState.isLoggedIn).toBe(true)
})

