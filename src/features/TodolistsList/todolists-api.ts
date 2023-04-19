import {AxiosResponse} from 'axios';
import {instance} from 'common/api';
import {UpdateDomainTaskModelType} from 'features/TodolistsList/tasks-reducer';
import {TaskPriorities, TaskStatuses} from 'common/enums';
import {ResponseType} from 'common/types';

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(arg: UpdateTodolistTitleArgType) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${arg.id}`, {title: arg.title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(arg: AddTaskArgType) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${arg.todolistId}/tasks`, {title: arg.title});
    },
    deleteTask(arg: RemoveTaskArgType) {
        return instance.delete<ResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
    },
    updateTask(taskId: string, todolistId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type  GetTasksResponseType = {
    error: string | null,
    totalCount: number,
    items: TaskType[]
}

export type AddTaskArgType = {
    todolistId: string,
    title: string
}

export type RemoveTaskArgType = {
    taskId: string,
    todolistId: string
}

export type UpdateTaskArgType = {
    taskId: string,
    todolistId: string,
    domainModel: UpdateDomainTaskModelType
}

export type UpdateTodolistTitleArgType = {
    id: string
    title: string
}