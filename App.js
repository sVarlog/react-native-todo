import React, {useState} from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import {Navbar} from './src/Navbar';
import {AddTodo} from './src/AddTodo';
import {Todo} from './src/Todo';

export default function App() {
	const [todos, setTodos] = useState([]);

	const addTodo = (title) => {
		const newTodo = {id: Date.now().toString() + title, title};

		setTodos((prev) => [newTodo].concat(prev));
	};

	const removeTodo = (id) => {
		setTodos(prev => prev.filter(el => el.id !== id));
	};

	return (
		<View style={styles.wrapper}>
			<Navbar title="Todo app"/>
			<View style={styles.container}>
				<AddTodo 
					style={styles.add} 
					onSubmit={addTodo} 
				/>

				<FlatList 
					data={todos}
					keyExtractor={item => item.id.toString()}
					renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} />}
				/>

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
