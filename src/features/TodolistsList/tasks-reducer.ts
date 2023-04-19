import {createSlice} from '@reduxjs/toolkit';
import {todolistsThunks} from 'features/TodolistsList/todolists-reducer';
import {appActions} from 'app/app-reducer';
import {clearTasksAndTodolists} from 'common/actions';
import {createAppAsyncThunk} from 'common/utils/create-app-async-thunk';
import {handleServerAppError} from 'common/utils/handle-server-app-error';
import {handleServerNetworkError} from 'common/utils/handle-server-network-error';
import {ResultCode, TaskPriorities, TaskStatuses} from 'common/enums';
import {
    AddTaskArgType,
    RemoveTaskArgType,
    TaskType,
    todolistsAPI,
    UpdateTaskArgType,
    UpdateTaskModelType
} from 'features/TodolistsList/todolists-api';

// thunks
const getTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>('tasks/getTasks',
    async (todolistId, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))
            const res = await todolistsAPI.getTasks(todolistId)
            const tasks = res.data.items
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {tasks, todolistId}
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>('tasks/addTask',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))
            const res = await todolistsAPI.createTask(arg)
            if (res.data.resultCode === ResultCode.SUCCEEDED) {
                const task = res.data.data.item
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return {task}
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const removeTask = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>('tasks/removeTask',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))
            const res = await todolistsAPI.deleteTask(arg)
            if (res.data.resultCode === ResultCode.SUCCEEDED) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return arg
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

export const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>('tasks/updateTask',
    async (arg, thunkAPI) => {
        const {dispatch, getState, rejectWithValue} = thunkAPI
        try {
            dispatch(appActions.setAppStatus({status: 'loading'}))

            const state = getState();
            const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
            if (!task) {
                dispatch(appActions.setAppError({error: 'Task not found in the state'}))
                return rejectWithValue(null)
            }

            const apiModel: UpdateTaskModelType = {
                title: task.title,
                status: task.status,
                deadline: task.deadline,
                description: task.description,
                startDate: task.startDate,
                priority: task.priority,
                ...arg.domainModel
            }

            const res = await todolistsAPI.updateTask(arg.taskId, arg.todolistId, apiModel)
            if (res.data.resultCode === ResultCode.SUCCEEDED) {
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return arg
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.task.todoListId]
                tasks.unshift(action.payload.task)
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((t) => t.id === action.payload.taskId)
                if (index !== -1) tasks.splice(index, 1)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((t) => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            })
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistsThunks.getTodolists.fulfilled, (state, action) => {
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
export const tasksThunks = {getTasks, addTask, removeTask, updateTask}

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}