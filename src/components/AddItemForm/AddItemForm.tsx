import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import AddBox from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';

type PropsType = {
    disabled?:boolean
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: PropsType) => {

    const {disabled,addItem} = props

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
        if (error !== null) {
            setError(null);
        }

        if (e.key === 'Enter') {
            addItemHandler();
        }
    }

    return (
        <div>
            <TextField value={title}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={onEnterPressHandler}
                       label={error ? 'Title is required' : 'Title'}
                       variant="outlined"
                       error={!!error}
                       style={{marginBottom: '10px'}}
                       disabled={disabled}
            />
            <IconButton color="primary" onClick={addItemHandler}  disabled={disabled}>
                <AddBox/>
            </IconButton>
        </div>
    );
});
