import React, {useCallback} from 'react';
import {AddItemForm} from 'components/AddItemForm/AddItemForm';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {Task} from './Task/Task'
import {FilterValuesType, TodolistDomainType} from 'features/TodolistsList/todolists-reducer';
import {TaskStatuses, TaskType} from 'api/todolists-api';

type PropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (taskId: string, todolistId: string, newStatus: TaskStatuses) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskId: string, todolistId: string, newValue: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}


export const Todolist = React.memo((props: PropsType) => {
        const {
            tasks,
            todolist,
            removeTask,
            changeFilter,
            addTask,
            changeTaskStatus,
            removeTodolist,
            changeTaskTitle,
            changeTodolistTitle
        } = props

        const onAllClickHandler = useCallback(() => changeFilter(todolist.id, 'all'), [changeFilter, todolist.id]);
        const onActiveClickHandler = useCallback(() => changeFilter(todolist.id, 'active'), [changeFilter, todolist.id]);
        const onCompletedClickHandler = useCallback(() => changeFilter(todolist.id, 'completed'), [changeFilter, todolist.id]);

        let tasksForTodolist = tasks
        if (todolist.filter === 'active') {
            tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
        }
        if (todolist.filter === 'completed') {
            tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
        }

        const changeTodolistTitleHandler = useCallback((title: string) => {
            changeTodolistTitle(todolist.id, title);
        }, [changeTodolistTitle, todolist.id])

        const removeTodolistHandler = () => {
            removeTodolist(todolist.id)
        }

        const addTaskHandler = useCallback((newTitle: string) => {
            addTask(todolist.id, newTitle)
        }, [addTask, todolist.id])

        return (
            <div>
                <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
                    <IconButton aria-label="delete" onClick={removeTodolistHandler}
                                disabled={todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
                <div>
                    {tasksForTodolist.map((t) => {
                        return <Task key={t.id}
                                     task={t}
                                     todolistId={todolist.id}
                                     removeTask={removeTask}
                                     changeTaskTitle={changeTaskTitle}
                                     changeTaskStatus={changeTaskStatus}
                        />
                    })}
                </div>
                <div style={{display: 'flex', gap: '5px', paddingTop: '10px'}}>
                    <Button variant={todolist.filter === 'all' ? 'contained' : 'outlined'} color="primary"
                            onClick={onAllClickHandler}>All</Button>
                    <Button variant={todolist.filter === 'active' ? 'contained' : 'outlined'} color="warning"
                            onClick={onActiveClickHandler}>Active</Button>
                    <Button variant={todolist.filter === 'completed' ? 'contained' : 'outlined'} color="success"
                            onClick={onCompletedClickHandler}>Completed</Button>
                </div>
            </div>
        );
    })
;
