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

    
}