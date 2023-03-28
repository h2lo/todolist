import React, {ChangeEvent, useCallback} from 'react'
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from '../../../../components/EditableSpan/EditableSpan';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';


type PropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, todolistId: string, newValue: string) => void
    changeTaskStatus: (taskId: string, todolistId: string, newStatus: TaskStatuses) => void
}
export const Task = React.memo((props: PropsType) => {
    const {
        task,
        todolistId,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
    } = props

    const removeTaskHandler = useCallback(() => {
        removeTask(task.id, todolistId)
    }, [task.id, todolistId])

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked
        changeTaskStatus(task.id, todolistId, newIsDone ? TaskStatuses.Completed : TaskStatuses.New)
    }, [task.id, todolistId])

    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, todolistId, newTitle)
    }, [task.id, todolistId])


    return (
        <div key={task.id}>
            <Checkbox size="small" checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatusHandler}/>
            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={removeTaskHandler}><Delete/></IconButton>
        </div>
    )
})
