import React, {useReducer, useContext} from 'react';
import {Alert} from 'react-native';
import {ScreenContext} from '../screen/screenContext';
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from '../types';
import {TodoContext} from './todoContext';
import {todoReducer} from './todoReducer';

export const TodoState = ({children}) => {
    const {changeScreen} = useContext(ScreenContext);

    const initialState = {
        todos: [{id: '1', title: 'Learn React Native'},]
    };
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = (title) => {
        dispatch({type: ADD_TODO, title: title})
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
                    onPress: () => {
                        changeScreen(null);
                        dispatch({type: REMOVE_TODO, id: todo.id})
					}
                }
            ],
			{cancelable: true}
        )
    };

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title});

    return (
        <TodoContext.Provider 
            value={{
                todos: state.todos,
                addTodo,
                removeTodo,
                updateTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    )
};