import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Alert} from 'react-native';

import {TodoContext} from './components/context/todo/todoContext';
import {Navbar} from './components/Navbar';
import {MainScreen} from './screens/MainScreen';
import {TodoScreen} from './screens/TodoScreen';

export const MainLayout = () => {
    const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext);
    const [todoId, setTodoId] = useState(null);

	const openTodoId = (id) => {
		setTodoId(id);
	};

	const closeTodoId = () => {
		setTodoId(null);
	};

    const confirmRemoveTodo = (todo) => {
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
						closeTodoId();
                        removeTodo(todo.id);
					}
                }
            ],
			{cancelable: true}
        )
	};

	let content;

	if (todoId) {
		const selectedTodo = todos.find(el => el.id === todoId);
		content = <TodoScreen 
			todo={selectedTodo} 
			removeTodo={confirmRemoveTodo} 
			goBack={closeTodoId}
			onSave={updateTodo}
		/>
	} else {
		content = <MainScreen 
			todos={todos} 
			addTodo={addTodo} 
			removeTodo={confirmRemoveTodo} 
			openTodo={openTodoId} 
		/>
	}

    return (
        <View style={styles.wrapper}>
			<Navbar title="Todo app"/>
			<View style={styles.container}>
				{content}
			</View>
		</View>
    );
};

const styles = StyleSheet.create({
	wrapper: {
		height: '100%'
	},
	add: {
		height: '20%'
	},
	container: {
		padding: 20,
		height: '95%'
	}
});