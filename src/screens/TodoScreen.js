import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {EditModal} from '../components/EditModal';
import {AppCard} from '../components/ui/AppCard';
import {THEME} from '../theme';

export const TodoScreen = ({todo, goBack, removeTodo, onSave}) => {
    const [modal, setModal] = useState(false);

    const saveHandler = (title) => {
        onSave(todo.id, title);
        setModal(false);
    }

    return (
        <View>
            <EditModal 
                value={todo.title}
                visible={modal} 
                onCancel={() => setModal(false)} 
                onSave={saveHandler}
            />

            <AppCard style={styles.card}>
                <Text style={styles.title}>{todo.title}</Text>
                <Button title="Edit" onPress={() => setModal(true)} />
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button title="Go back" color={THEME.GREY_COLOR} onPress={goBack} />
                </View>
                <View style={styles.button}>
                    <Button title="Remove" color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo)} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        marginBottom: 25,
    },
    button: {
        width: '49%'
    },
    title: {
        fontSize: 26
    }
});