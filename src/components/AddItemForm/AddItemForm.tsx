import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type PropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: PropsType) => {

    const {addItem} = props

    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);

        if (e.key === 'Enter') {
            addItemHandler();
        }
    }

    return (
        <div>
            <TextField value={title}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={onEnterPressHandler}
                       label={error ? 'Title is required' : 'Add title'}
                       variant="outlined"
                       size={'small'}
                       error={!!error}
            />
            <Button variant="contained" size={'small'} onClick={addItemHandler}
                    style={{
                        maxWidth: '38px',
                        maxHeight: '38px',
                        minWidth: '38px',
                        minHeight: '38px',
                        backgroundColor: 'hotpink'
                    }}>
                +</Button>
        </div>
    );
};

export default AddItemForm;