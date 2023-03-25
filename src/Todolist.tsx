import React from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
}

const Todolist = (props: PropsType) => {
    const {title, tasks, removeTask, changeFilter} = props

    const onAllClickHandler = () => changeFilter('all');
    const onActiveClickHandler = () => changeFilter('active');
    const onCompletedClickHandler = () => changeFilter('completed');

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map((t) => {
                    const removeTaskHandler = () => {
                        removeTask(t.id)
                    }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>
                    All
                </button>
                <button onClick={onActiveClickHandler}>
                    Active
                </button>
                <button onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;