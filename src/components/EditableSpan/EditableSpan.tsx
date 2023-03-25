import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    value: string
    onChange: (newTitle: string) => void
}

const EditableSpan = (props: PropsType) => {

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
            ? <input
                value={title}
                onChange={onChangeHandler}
                onBlur={offEditMode}
                autoFocus={true}/>
            : <span onDoubleClick={onEditMode}>{props.value}</span>
    );
};

export default EditableSpan;