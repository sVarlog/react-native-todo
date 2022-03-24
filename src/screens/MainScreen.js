import React from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';


export const MainScreen = ({addTodo, todos, removeTodo, openTodo}) => {
    let content;

    if (todos.length > 0) {
        content = <FlatList 
            data={todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo}/>}
        />
    } else {
        content = <View style={styles.imgWrap}>
            <Image style={styles.img} source={require('../../assets/no-items.png')} />
        </View>
    }

    return (
        <View>
            <AddTodo 
                style={styles.add} 
                onSubmit={addTodo} 
            />

            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});