import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, FlatList, Keyboard, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import RemixIcon from 'react-native-remix-icon';

export default function App({ menus, menuCategories, handleUpdate }) {
    const [mode, setMode] = useState(0);
    const [type, setType] = useState("UPDATE");
    const [updateObject, setUpdateObject] = useState();
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [errors, setErrors] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(0);

    useEffect(() => {
        setMode(0)
    }, [menus]);


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
        }

    };

    const TableItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { textAlign: "left" }]}>{item.name}</Text>
            <Text style={[styles.tableCell, { textAlign: "right" }]}> ₹ {item.price}</Text>
            <TouchableOpacity style={{ marginLeft: 10, paddingHorizontal: 10 }} onPress={() => handleEdit(item)}>
                <RemixIcon name='pencil-line' size={20} color={"#007BFF"} />
            </TouchableOpacity>
        </View >
    );

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                {
                    backgroundColor:
                        selectedCategory === item.menu_id ? '#4CAF50' : '#E0E0E0',
                },
            ]}
            onPress={() => setSelectedCategory(item.menu_id)}
        >
            <Text style={{
                color: selectedCategory === item.menu_id ? '#fff' : '#000',
            }}>{item.name}</Text>
        </TouchableOpacity>
    );

    const filteredMenuItems = useMemo(() => {
        if (selectedCategory === 0) {
            return menus;
        } else {
            return menus.filter(
                item =>
                    item.menuid ===
                    menuCategories.find(cat => cat.menu_id === selectedCategory)?.menu_id
            );
        }
    }, [selectedCategory, menus, menuCategories]);

    const updateCase = () => {
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

    return (
        <>
            {mode == 0
                ? <View style={{ flex: 1, margin: 16 }}>
                    <View style={{ flex: 0.06 }}>
                        <FlatList
                            data={menuCategories}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderCategory}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                    <View style={{ flex: 0.94, marginTop: 10 }}>
                        <FlatList
                            data={filteredMenuItems}
                            renderItem={TableItem}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </View> : updateCase()
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