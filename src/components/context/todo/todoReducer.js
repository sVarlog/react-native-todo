import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from "../types";

const handlers = {
    [ADD_TODO]: (state, {title}) => ({
        ...state, 
        todos: [...state.todos, {
            id: Date.now().toString() + title, 
            title
        }]
    }),
    [REMOVE_TODO]: (state, {id}) => ({
        ...state, 
        todos: state.todos.filter(el => el.id !== id)
    }),
    [UPDATE_TODO]: (state, {id, title}) => ({
        ...state, 
        todos: state.todos.map(el => {
            if (el.id === id) el.title = title;
            return el;
        })
    }),
    DEFAULT: state => state
};

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    const result = handler(state, action);
    return result;
};