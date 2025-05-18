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
            return {...state, newTodo: action.payload };
    }
}

function TodoList () {
    const [state, dispatch] = useReducer(TodoReducer, initialState);

    return (
        <>
            <fieldset className="fieldset">
                <h1 className = "text-3xl">Todo List</h1>
                <input type="text" value = {state.newTodo} onChange = {(e) => dispatch ({type:"TYPE_NEW_TODO", payload: e.target.value})} className="input" placeholder="Add Todo Here!" />
                    <div>Current input: {state.newTodo}</div> {/* Debug output */}

            </fieldset>
        
        
        
        
        
        
        </>
    )
}


export default TodoList;