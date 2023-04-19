import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type PropsType = {
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {

    const {value, onChange} = props

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const onEditMode = () => {
        setEditMode(true)
        setTitle(value)
    }

    const offEditMode = () => {
        setEditMode(false)
        onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField size={'small'} value={title} onChange={onChangeHandler} autoFocus onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>{props.value}</span>
    );
});
