import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './app/App';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
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


export const Todolist = React.memo((props: PropsType) => {
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

    const onAllClickHandler = useCallback(() => changeFilter(id, 'all'), [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => changeFilter(id, 'active'), [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => changeFilter(id, 'completed'), [changeFilter, id]);

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
            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox size="small" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTaskHandler}><Delete/></IconButton>
            </div>
        )
    })

    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(id, title);
    }, [changeTodolistTitle, id])

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    const addTaskHandler = useCallback((newTitle: string) => {
        addTask(id, newTitle)
    }, [addTask, id])

    return (
        <div>
            <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <div>
                {tasksList}
            </div>
            <div style={{display: 'flex', gap: '5px', paddingTop: '10px'}}>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'} color="primary"
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'} color="warning"
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'} color="success"
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
});
