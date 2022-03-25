import React, {useState} from 'react';
import {View, TextInput, Alert, StyleSheet, Keyboard} from 'react-native';
import {AntDesign} from '@expo/vector-icons'; 
import {THEME} from '../theme';
import {AppButton} from './ui/AppButton';

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('');

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value);
            Keyboard.dismiss();
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
            <AppButton onPress={pressHandler}>
                <AntDesign style={styles.button} name="pluscircleo" size={20} />
                Add todo
            </AppButton>
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
        width: '65%',
        padding: 5,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderColor: THEME.MAIN_COLOR,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
    }
});