import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './components/AddItemForm/AddItemForm';
import EditableSpan from './components/EditableSpan/EditableSpan';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

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
    changeTaskTitle: (taskId: string, todolistId: string, newValue: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}


const Todolist = (props: PropsType) => {
    const {
        id,
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = props

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

        const changeTaskTitleHandler = (newTitle: string) => {
            changeTaskTitle(t.id, id, newTitle)
        }

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox defaultChecked size="small" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTaskHandler}><Delete/></IconButton>
            </li>
        )
    })

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title);
    }
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    const addTaskHandler = (newTitle: string) => {
        addTask(id, newTitle)
    }
    return (
        <div>
            <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'} color="secondary"
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'} color="success"
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'} color="error"
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
};

export default Todolist;