import {addTodolistAC, TodolistDomainType, todolistsReducer} from '../reducers/todolists-reducer';
import {tasksReducer} from '../reducers/tasks-reducer';
import {TasksStateType} from '../../app/App';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    let newTodolist = {
        id: 'id',
        title: 'Title',
        addedDate: '',
        order: 0
    }

    const action = addTodolistAC(newTodolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})