import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {EditModal} from '../components/EditModal';
import {AppButton} from '../components/ui/AppButton';
import {AppCard} from '../components/ui/AppCard';
import {AppTextBold} from '../components/ui/AppTextBold';
import {THEME} from '../theme';
import {AntDesign} from '@expo/vector-icons';

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
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <AntDesign name="edit" size={15} color="white" />
                </AppButton>
            </AppCard>

            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton color={THEME.GREY_COLOR} onPress={goBack}>
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