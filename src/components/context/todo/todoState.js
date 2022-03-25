import React, {useReducer, useContext} from 'react';
import {Alert} from 'react-native';
import {ScreenContext} from '../screen/screenContext';
import {ADD_TODO, FETCH_TODOS, HIDE_ERROR, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO} from '../types';
import {TodoContext} from './todoContext';
import {todoReducer} from './todoReducer';
import {Http} from '../../../http';

export const TodoState = ({children}) => {
    const {changeScreen} = useContext(ScreenContext);

    const initialState = {
        todos: [],
        loading: false,
        error: null
    };
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async (title) => {
        clearError();
        try {
            const data = await Http.post('https://react-native-todo-app-28c16-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {title});
            dispatch({type: ADD_TODO, title, id: data.name});   
        } catch (err) {
            showError('Something was wrong...');
        }
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
                        clearError();
                        try {
                            await Http.delete(`https://react-native-todo-app-28c16-default-rtdb.europe-west1.firebasedatabase.app/todos/${todo.id}.json`);
                            changeScreen(null);
                            dispatch({type: REMOVE_TODO, id: todo.id})
                        } catch (err) {
                            showError('Something was wrong...');
                            changeScreen(null);
                        }
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
            const data = await Http.get('https://react-native-todo-app-28c16-default-rtdb.europe-west1.firebasedatabase.app/todos.json');
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
            await Http.patch(`https://react-native-todo-app-28c16-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {title});
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