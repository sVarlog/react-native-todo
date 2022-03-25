import React, {useContext, useEffect, useCallback} from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {ScreenContext} from '../components/context/screen/screenContext';
import {TodoContext} from '../components/context/todo/todoContext';
import {Todo} from '../components/Todo';
import { AppButton } from '../components/ui/AppButton';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { THEME } from '../theme';



export const MainScreen = () => {
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
    const {changeScreen} = useContext(ScreenContext);
    
    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

    useEffect(() => {  
        loadTodos();
    }, []);

    if (loading) {
        return <AppLoader />
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
                <AppButton onPress={loadTodos}>Repeat</AppButton>
            </View>
        )
    }

    let content;

    if (todos.length > 0) {
        content = <FlatList 
            data={todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>}
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
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR,
        marginBottom: 20
    }
});