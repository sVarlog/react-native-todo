import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Navbar} from './src/components/Navbar';
import {MainScreen} from './src/screens/MainScreen';
import {TodoScreen} from './src/screens/TodoScreen';

export default function App() {
	const [todoId, setTodoId] = useState(null);
	const [todos, setTodos] = useState([
		// {id: '1', title: 'Learn React Native'},
	]);

	const addTodo = (title) => {
		const newTodo = {id: Date.now().toString() + title, title};

		setTodos((prev) => [newTodo].concat(prev));
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
						closeTodoId();
						setTodos(prev => prev.filter(el => el.id !== todo.id));
					}
                }
            ],
			{cancelable: true}
        )
	};

	const openTodoId = (id) => {
		setTodoId(id);
	};

	const closeTodoId = () => {
		setTodoId(null);
	};

	const updateTodo = (id, title) => {
		setTodos(old => old.map(el => {
			if (el.id === id) el.title = title;
			return el;
		}));
	};

	let content;

	if (todoId) {
		const selectedTodo = todos.find(el => el.id === todoId);
		content = <TodoScreen 
			todo={selectedTodo} 
			removeTodo={removeTodo} 
			goBack={closeTodoId}
			onSave={updateTodo}
		/>
	} else {
		content = <MainScreen 
			todos={todos} 
			addTodo={addTodo} 
			removeTodo={removeTodo} 
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
