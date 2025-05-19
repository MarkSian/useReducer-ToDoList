import { useReducer } from "react";

const initialState = {
    todos: [],
    newTodo: "",
    editTodo: null,
    editTodoText: ""
};
const TodoReducer = (state, action) => {
    switch (action.type) {
        case "TYPE_NEW_TODO":
            return { ...state, newTodo: action.payload };
        case "ADD_TODO":
            if (state.newTodo.trim() === '') return state;
            return {
                ...state, todos: [{
                    id: Date.now(),
                    text: state.newTodo,
                    completed: false
                },
                ...state.todos],
                newTodo: ""
            };
        case "TOGGLE_COMPLETE":
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case 'START_EDITING':
            return {
                ...state,
                editingId: action.payload.id,
                editText: action.payload.text
            };
        case 'SET_EDIT_TEXT':
            return { ...state, editText: action.payload };
        case 'SAVE_EDIT':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, text: state.editText } : todo
                ),
                editingId: null
            };
        default:
            return state;
    }
};

function TodoList() {
    const [state, dispatch] = useReducer(TodoReducer, initialState);

    return (
        <div className="flex flex-col items-center min-h-screen bg-base-200 py-8">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-3xl mb-4">Todo List</h1>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={state.newTodo}
                            onChange={(e) => dispatch({ type: "TYPE_NEW_TODO", payload: e.target.value })}
                            className="input input-bordered w-full"
                            placeholder="Add Todo Here!"
                        />
                        <button
                            onClick={() => dispatch({ type: "ADD_TODO" })}
                            className="btn btn-primary"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {state.todos.map(todo => (
                            <li
                                key={todo.id}
                                className="flex items-center gap-2 p-2 rounded-lg bg-base-200"
                            >
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={todo.completed}
                                    onChange={() => dispatch({ type: 'TOGGLE_COMPLETE', payload: todo.id })}
                                />

                                {state.editingId === todo.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={state.editText}
                                            onChange={(e) => dispatch({ type: 'SET_EDIT_TEXT', payload: e.target.value })}
                                            className="input input-sm input-bordered"
                                        />
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => dispatch({ type: 'SAVE_EDIT', payload: todo.id })}
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}
                                        >
                                            {todo.text}
                                        </span>
                                        <button
                                            className="btn btn-sm btn-info"
                                            onClick={() => dispatch({ type: 'START_EDITING', payload: { id: todo.id, text: todo.text } })}
                                            disabled={todo.completed}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                                            disabled={!todo.completed}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TodoList;