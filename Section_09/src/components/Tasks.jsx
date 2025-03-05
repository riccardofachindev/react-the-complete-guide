import AddTask from "./AddTask";

export default function Tasks({ onAdd, onDelete, tasks }) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <AddTask onAddTask={onAdd} />
            {tasks.length > 0 ? (
                <ul className="p-4 mt-8 rounded-md bg-stone-100">
                    {tasks.map(task => <li key={task.id} className="flex justify-between my-4">
                        <span>{task.name}</span>
                        <button className="text-stone-700 hover:text-red-500" onClick={() => onDelete(task.id)}>Clear</button>
                    </li>)}
                </ul>
            ) : (
                <p className="text-stone-800 my-4">This project does not have any task.</p>
            )}
        </section>
    )
}