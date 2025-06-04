import { useContext } from "react"

import Todo from "../models/todo"
import classes from './TodoItem.module.css'
import { TodosContext } from "../store/todos-context"

const TodoItem: React.FC<{ item: Todo }> = (props) => {
    const todosCtx = useContext(TodosContext)

    return (
        <li className={classes.item}>
            <p>{props.item.text}</p>
            <button onClick={() => todosCtx.removeTodo(props.item.id)}>Remove</button>
        </li>
    )
}

export default TodoItem;