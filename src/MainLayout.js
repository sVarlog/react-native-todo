import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScreenContext} from './components/context/screen/screenContext';

import {Navbar} from './components/Navbar';
import {MainScreen} from './screens/MainScreen';
import {TodoScreen} from './screens/TodoScreen';

export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext);

    const content = todoId ? <TodoScreen /> : <MainScreen />

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