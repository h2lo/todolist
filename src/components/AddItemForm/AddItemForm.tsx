import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: PropsType) => {

    const {addItem} = props

    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const addTaskHandler = () => {
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
            addTaskHandler();
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={changeTaskTitleHandler}
                onKeyDown={onEnterPressHandler}
                className={error ? 'error' : ''}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default AddItemForm;