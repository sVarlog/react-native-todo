import {ADD_TODO, FETCH_TODOS, SHOW_ERROR, HIDE_ERROR, HIDE_LOADER, REMOVE_TODO, SHOW_LOADER, UPDATE_TODO} from "../types";

const handlers = {
    [ADD_TODO]: (state, {title, id}) => ({
        ...state, 
        todos: [...state.todos, {id, title}]
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
    [SHOW_LOADER]: (state) => ({...state, loading: true}),
    [HIDE_LOADER]: (state) => ({...state, loading: false}),
    [HIDE_ERROR]: (state) => ({...state, error: null}),
    [SHOW_ERROR]: (state, {error}) => ({...state, error}),
    [FETCH_TODOS]: (state, {todos}) => ({...state, todos}),
    DEFAULT: state => state
};

export const todoReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    const result = handler(state, action);
    return result;
};