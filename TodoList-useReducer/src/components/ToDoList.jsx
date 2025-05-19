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
        case "ADD_TODO":
             if (state.newTodo.trim() === '') return state;
            return {...state, todos: [{id: Date.now(), 
                text:state.newTodo, 
                completed: false}, 
                ...state.todos], 
                newTodo: ""
            };
    }
}

function TodoList () {
    const [state, dispatch] = useReducer(TodoReducer, initialState);



    return (
        <>
            <fieldset className="fieldset">
                <h1 className = "text-3xl">Todo List</h1>
                <input type="text" value = {state.newTodo} onChange = {(e) => dispatch ({type:"TYPE_NEW_TODO", payload: e.target.value})} className="input" placeholder="Add Todo Here!" />
                <button onClick = {() => dispatch({type: "ADD_TODO"})} className="btn">Add Your Todo</button>
            </fieldset>

            <ul>
                {state.todos.map(todo => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
                
            </ul>
        
        
        
        
        
        
        </>
    )
}


export default TodoList;