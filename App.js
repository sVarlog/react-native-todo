import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navbar} from './src/Navbar';
import {AddTodo} from './src/AddTodo';
import { Todo } from './src/Todo';

export default function App() {
	const [todos, setTodos] = useState([]);

	const addTodo = (title) => {
		const newTodo = {id: Date.now().toString(), title};

		setTodos((prev) => [...prev, newTodo]);
	}

	return (
		<View>
			<Navbar title="Todo app"/>
			<View style={styles.container}>
				<AddTodo onSubmit={addTodo} />

				<View>
					{showTodos(todos)}
				</View>

			</View>
		</View>
	);
}

const showTodos = (todos) => {
	return todos.map((todo) => <Todo todo={todo} key={todo.id}/>)
}

const styles = StyleSheet.create({
	container: {
		padding: 20
	}
});
