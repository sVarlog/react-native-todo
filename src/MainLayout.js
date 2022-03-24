import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Alert} from 'react-native';
import {ScreenContext} from './components/context/screen/screenContext';

import {TodoContext} from './components/context/todo/todoContext';
import {Navbar} from './components/Navbar';
import {MainScreen} from './screens/MainScreen';
import {TodoScreen} from './screens/TodoScreen';

export const MainLayout = () => {
    const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext);
    
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
						changeScreen(null);
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
			goBack={() => changeScreen(null)}
			onSave={updateTodo}
		/>
	} else {
		content = <MainScreen 
			todos={todos} 
			addTodo={addTodo} 
			removeTodo={confirmRemoveTodo} 
			openTodo={changeScreen} 
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