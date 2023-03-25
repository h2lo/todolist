import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (taskId: string, todolistId: string, newIsDone: boolean) => void
    removeTodolist: (todolistID: string) => void
}


const Todolist = (props: PropsType) => {
    const {id, title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus, removeTodolist} = props

    let [taskTitle, setTaskTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const onAllClickHandler = () => changeFilter(id, 'all');
    const onActiveClickHandler = () => changeFilter(id, 'active');
    const onCompletedClickHandler = () => changeFilter(id, 'completed');

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(id, taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);

        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    const tasksList = tasks.map((t) => {
        const removeTaskHandler = () => {
            removeTask(t.id, id)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDone = e.currentTarget.checked
            changeTaskStatus(t.id, id, newIsDone)
        }

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeTaskStatusHandler}
                />
                <span>{t.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    return (
        <div>
            <h3>{title}</h3>
            <button onClick={removeTodolistHandler}>x</button>
            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={onEnterPressHandler}
                    className={error ? 'error' : ''}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={filter === 'all' ? 'active-filter' : ''}>
                    All
                </button>
                <button onClick={onActiveClickHandler} className={filter === 'active' ? 'active-filter' : ''}>
                    Active
                </button>
                <button onClick={onCompletedClickHandler} className={filter === 'completed' ? 'active-filter' : ''}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;