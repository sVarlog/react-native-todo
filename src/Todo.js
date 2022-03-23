import React from "react";
import {Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";

export const Todo = ({todo, onRemove}) => {
    const showNotification = () => {
        Alert.alert(
            'Delete todo?',
            '',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Remove',
                    onPress: () => onRemove(todo.id)
                }
            ]
        )
    };

    return (
        <TouchableOpacity 
            activeOpacity={.5} 
            onPress={() => console.log('Pressed', todo.id)}
            onLongPress={showNotification}
        >
            <View style={styles.todo}>
                <Text>{todo.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10
    }
})