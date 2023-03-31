import {authReducer, InitialStateType, setIsLoggedInAC} from '../reducers/auth-reducer';

let startState: InitialStateType

beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('correct status should be set', () => {
    const endState = authReducer(startState, setIsLoggedInAC (true))

    expect(endState.isLoggedIn).toBe(true)
})

