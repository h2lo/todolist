import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './components/AddItemForm/AddItemForm';

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

    const onAllClickHandler = () => changeFilter(id, 'all');
    const onActiveClickHandler = () => changeFilter(id, 'active');
    const onCompletedClickHandler = () => changeFilter(id, 'completed');

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
    const addTaskHandler = (newTitle: string) => {
        addTask(id, newTitle)
    }
    return (
        <div>
            <h3>{title}</h3>
            <button onClick={removeTodolistHandler}>x</button>
            <AddItemForm addItem={addTaskHandler}/>
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