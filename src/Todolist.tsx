import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

const Todolist = (props: PropsType) => {
    const {title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus} = props

    let [taskTitle, setTaskTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const onAllClickHandler = () => changeFilter('all');
    const onActiveClickHandler = () => changeFilter('active');
    const onCompletedClickHandler = () => changeFilter('completed');

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
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
            removeTask(t.id)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDone = e.currentTarget.checked
            changeTaskStatus(t.id, newIsDone)
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

    return (
        <div>
            <h3>{title}</h3>
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