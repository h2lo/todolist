import {ResultCode, TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from 'api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from 'app/store';
import {handleServerAppError, handleServerNetworkError} from 'utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {todolistsActions} from 'features/TodolistsList/todolists-reducer';
import {appActions} from 'app/app-reducer';
import {clearTasksAndTodolists} from 'common/actions/common.actions';

const initialState: TasksStateType = {}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index !== -1) tasks.splice(index, 1)
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(clearTasksAndTodolists, () => {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

//thunks
export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(tasksActions.setTasks({tasks, todolistId}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCEEDED) {
                    const task = res.data.data.item
                    dispatch(tasksActions.addTask({task}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistsAPI.deleteTask(taskId, todolistId)
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCEEDED) {
                    dispatch(tasksActions.removeTask({taskId, todolistId}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(appActions.setAppStatus({status: 'loading'}))

        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return;
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            startDate: task.startDate,
            priority: task.priority,
            ...domainModel
        }

        todolistsAPI.updateTask(taskId, todolistId, apiModel)
            .then((res) => {
                if (res.data.resultCode === ResultCode.SUCCEEDED) {
                    dispatch(tasksActions.updateTask({taskId, model: domainModel, todolistId}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

