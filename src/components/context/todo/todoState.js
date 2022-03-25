import React, {useReducer, useContext} from 'react';
import {Alert} from 'react-native';
import {ScreenContext} from '../screen/screenContext';
import {ADD_TODO, FETCH_TODOS, HIDE_ERROR, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO} from '../types';
import {TodoContext} from './todoContext';
import {todoReducer} from './todoReducer';

export const TodoState = ({children}) => {
    const {changeScreen} = useContext(ScreenContext);

    const initialState = {
        todos: [],
        loading: false,
        error: null
    };
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async (title) => {
        const respone = await fetch('https://react-native-todo-app-28c16-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
            method: 'POST',
            headers: {'Content-Type': 'applization/json'},
            body: JSON.stringify({title})
        });

        const data = await respone.json();
        console.log(data);
        dispatch({type: ADD_TODO, title, id: data.name});
    };

    const removeTodo = (todo) => {
		Alert.alert(
            'Delete todo',
            `Are you sure to delete "${todo.title}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Remove',
					style: 'destructive',
                    onPress: async () => {
                        changeScreen(null);
                        await fetch(`https://react-native-todo-app-28c16-default-rtdb.europe-west1.firebasedatabase.app/todos/${todo.id}.json`, {
                            method: 'DELETE',
                            headers: {'Content-Type': 'application/json'}
                        })
                        dispatch({type: REMOVE_TODO, id: todo.id})
					}
                }
            ],
			{cancelable: true}
        )
    };

    const fetchTodos = async () => {
        showLoader();
        clearError();
        try {
            const response = await fetch('https://react-native-todo-app-28c16-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
                method: 'GET',
                headers: {'Content-type': 'application/json'}
            });
            const data = await response.json();
            console.log('fetch data', data);
            const todos = data ? Object.keys(data).map(key => ({...data[key], id: key})) : [];
            dispatch({type: FETCH_TODOS, todos});
        } catch (err) {
            showError('Something was wrong...');
            console.log(err);
        } finally {
            hideLoader();
        }
    }

    const updateTodo = async (id, title) => {
        clearError();
        try {
            await fetch(`https://react-native-todo-app-28c16-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title})
            });
            dispatch({type: UPDATE_TODO, id, title});
        } catch (err) {
            showError('Something was wrong...');
            console.log(err);
        }
    }

    const showLoader = () => dispatch({type: SHOW_LOADER});

    const hideLoader = () => dispatch({type: HIDE_LOADER});

    const showError = (error) => dispatch({type: SHOW_ERROR, error});

    const clearError = () => dispatch({type: HIDE_ERROR});

    return (
        <TodoContext.Provider 
            value={{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                addTodo,
                removeTodo,
                updateTodo,
                fetchTodos
            }}
        >
            {children}
        </TodoContext.Provider>
    )
};