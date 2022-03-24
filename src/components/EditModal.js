import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native';
import { THEME } from '../theme';

export const EditModal = ({visible, onCancel, value, onSave}) => {
    const [title, setTitle] = useState(value);

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Error', `Min lenght title 3 symbols, now ${title.trim().length} symbols.`);
        } else {
            onSave(title);
        }
    };

    return (
        <Modal visible={visible} animationType="fade" transparent={false}>
            <View style={styles.wrap}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Enter new title" 
                    autoCorrect={false} 
                    maxLength={64} 
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={onCancel} color={THEME.DANGER_COLOR} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Save" onPress={saveHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '80%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '49%'
    }
})