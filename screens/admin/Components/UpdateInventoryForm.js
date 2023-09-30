import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View, Alert, Text, FlatList, Keyboard, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import RemixIcon from 'react-native-remix-icon';

export default function App({ inventories, handleUpdate, handleCreate,handleDelete }) {
    const [mode, setMode] = useState(0);
    const [type, setType] = useState("UPDATE");
    const [updateObject, setUpdateObject] = useState();
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [errors, setErrors] = useState('');

    useEffect(() => {
        setMode(0)
    }, [inventories]);


    const handleTextChange = (text) => {
        setName(text);
    };

    const handleNumberChange = (number) => {
        setPrice(number)
    };

    const handleEdit = (item) => {
        setPrice(`${item.price}`)
        setName(item.name)
        setUpdateObject(item)
        setMode(1);
        setType('UPDATE');
    }

    const handleCreateButton = () => {
        setPrice('');
        setName('');
        setMode(1);
        setType('CREATE');
    }

    const handleDeleteButton = (item) => {
        Alert.alert(
            'Message',
            'Do you want to delete this item', [
            { text: 'Cancel', onPress: () => console.log('Cancel') },
            { text: 'Confirm', onPress: () => handleDelete(item), style: 'Ok' },
        ],
            { cancelable: true },
        )
        return true
    }

    const handleError = (errorMessage, input) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
    };

    const UpdateMenu = (value) => {
        Keyboard.dismiss();
        let valid = true;
        if (!name) {
            handleError('Please enter name', 'name');
            valid = false;
        }
        if (!price) {
            handleError('Please enter price', 'price');
            valid = false;
        }

        if (valid && value == 'UPDATE') {
            handleUpdate({ ...updateObject, name, price });
        } else if (valid) {
            let model = {
                name,
                price: parseInt(price),
                created_date: new Date()
            };
            handleCreate(model);
        }
    };

    const formattedDate = (value) => {
        const currentDate = moment();
        const createdDate = moment(value);
        const daysDifference = currentDate.diff(createdDate, 'days');
        let formattedDate;
        if (daysDifference === 0) {
            formattedDate = 'Today';
        } else if (daysDifference === 1) {
            formattedDate = 'Yesterday';
        } else {
            formattedDate = createdDate.format('MMM DD h:mm A');
        }
        return formattedDate;
    };

    const TableItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { textAlign: "left" }]}>{item.name}</Text>
            <Text style={styles.tableCell}>{formattedDate(item.created_date)}</Text>
            <Text style={[styles.tableCell, { textAlign: "right" }]}> ₹ {item.price}</Text>
            <TouchableOpacity style={{ marginLeft: 10, paddingHorizontal: 10 }} onPress={() => handleEdit(item)}>
                <RemixIcon name='pencil-line' size={20} color={"#007BFF"} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10, paddingHorizontal: 10 }} onPress={() => handleDeleteButton(item)}>
                <RemixIcon name='delete-bin-6-line' size={20} color={"#FF0000"} />
            </TouchableOpacity>
        </View >
    );

    const InputForm = () => {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => setMode(0)}>
                    <RemixIcon name='arrow-left-line' size={25} color={"#000"} />
                </TouchableOpacity>

                <TextInput
                    style={styles.textInputStyle}
                    contentStyle={styles.textInputContentStyle}
                    label="Name"
                    value={name}
                    onChangeText={handleTextChange}
                    onFocus={() => {
                        handleError(null, 'name');
                    }}
                />
                <HelperText type="error" visible={errors.name} style={styles.err}>
                    {errors.name}
                </HelperText>
                <TextInput
                    style={styles.textInputStyle}
                    contentStyle={[styles.textInputContentStyle]}
                    label="Price"
                    value={price}
                    onChangeText={handleNumberChange}
                    keyboardType='number-pad'
                    onFocus={() => {
                        handleError(null, 'price');
                    }}
                />
                <HelperText type="error" visible={errors.price} style={styles.err}>
                    {errors.price}
                </HelperText>
                <View style={styles.buttonRow}>
                    <Button
                        mode="contained"
                        onPress={() => UpdateMenu(type)}
                        style={styles.button}
                    >
                        {type}
                    </Button>
                </View>
            </View>
        )
    }

    const createButton = () => {
        return (
            <View style={{
                height: 40, marginHorizontal: 40, borderRadius: 10,
                backgroundColor: "#007BFF", justifyContent: 'center', alignItems: "center"
            }}>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => handleCreateButton()}>
                    <Text style={{ color: "#fff" }}>{`Create New Inventory`} </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            {mode == 0
                ? <View style={{ flex: 1, marginVertical: 10 }}>
                    {createButton()}
                    <FlatList
                        data={inventories}
                        renderItem={TableItem}
                        keyExtractor={(item) => item.id}
                    />
                </View> : InputForm()
            }
        </>
    );
}

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    categoryItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20
    },
    button: {
        marginHorizontal: 10,
    },
    textInputStyle: {
        backgroundColor: "#fff",
        paddingHorizontal: 0,
        height: 0,
        margin: 0,
        padding: 0
    },
    textInputContentStyle: {
        color: '#000',
    },
    err: {
        left: 15
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },

});