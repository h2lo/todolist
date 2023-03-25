import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
