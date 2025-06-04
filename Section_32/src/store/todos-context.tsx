import { createContext, useState } from "react";

import Todo from "../models/todo";

type TodosContextObj = {
    items: Todo[],
    addTodo: (todoText: string) => void,
    removeTodo: (todoId: string) => void
}

export const TodosContext = createContext<TodosContextObj>({
    items: [],
    addTodo: (todoText: string) => { },
    removeTodo: (todoId: string) => { }
})

const TodosContextProvider: React.FC = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText);

        setTodos(prevTodos => {
            return prevTodos.concat(newTodo);
        })
    }

    const removeTodoHandler = (todoId: string) => {
        setTodos(prevTodos => {
            return prevTodos.filter(todo => todo.id !== todoId)
        })
    }

    const contextValue: TodosContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler
    }

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    )
}

export default TodosContextProvider;