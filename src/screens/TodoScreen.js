import React, {useState, useContext} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {EditModal} from '../components/EditModal';
import {AppButton} from '../components/ui/AppButton';
import {AppCard} from '../components/ui/AppCard';
import {AppTextBold} from '../components/ui/AppTextBold';
import {THEME} from '../theme';
import {AntDesign} from '@expo/vector-icons';
import {TodoContext} from '../components/context/todo/todoContext';
import {ScreenContext} from '../components/context/screen/screenContext';

export const TodoScreen = () => {
    const {todos, updateTodo, removeTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext);
    const [modal, setModal] = useState(false);

    const saveHandler = async (title) => {
        await updateTodo(todo.id, title);
        setModal(false);
    }

    const todo = todos.find(el => el.id === todoId);

    return (
        <View>
            <EditModal 
                value={todo.title}
                visible={modal} 
                onCancel={() => setModal(false)} 
                onSave={saveHandler}
            />

            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <AntDesign name="edit" size={15} color="white" />
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
                        Go back
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo)}>
                        Remove
                    </AppButton>
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
        width: (Dimensions.get('window').width / 2) - 30,
    },
    title: {
        fontSize: 26
    }
});