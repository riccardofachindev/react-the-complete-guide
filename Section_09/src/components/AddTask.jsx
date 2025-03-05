import { useState } from 'react';

export default function AddTask({ onAddTask }) {
    const [task, setTask] = useState('');

    function onChangeHandler(event) {
        setTask(event.target.value);
    }

    function onClickHandler() {
        if (task.trim() === '') {
            return;
        }

        onAddTask(task);
        setTask('');
    }

    return (
        <div className="flex items-center gap-4">
            <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={onChangeHandler} value={task} />
            <button className="text-stone-700 hover:text-stone-950" onClick={onClickHandler}>Add task</button>
        </div>
    )
}