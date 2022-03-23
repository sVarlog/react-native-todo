import React, {useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('');

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value);
            setValue('');
        } else {
            Alert.alert(
                'Error',
                'Todo title cannot be empty!'
            );
        }
    };

    return (
        <View style={styles.block}>
            <TextInput 
                style={styles.input} 
                onChangeText={text => setValue(text)} 
                value={value} 
                placeholder="Enter todo name" 
                autoCorrect={false}
            />
            <Button style={styles.button} title="Add todo" onPress={pressHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '70%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderColor: '#3949ab',
    },
    button: {
        backgroundColor: '#000',
    }
});