import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Text, View } from 'react-native';
import PrimaryText from '../../../Components/PrimaryText';

const EmptyTable = ({ items, selectCategory, handleSelectedTable }) => {

    const [isTableAvailable] = React.useState(items.find((item) => !item.booked && item.tableType === selectCategory))

    const FilterList = ({ item }) => {
        const { name, booked, value, tableType } = item;
        if (!booked && tableType === selectCategory) {
            return (
                <TouchableOpacity
                    onPress={() => handleSelectedTable(item, name)}
                    style={styles.filterListItem}
                    key={value + name}
                >
                    <Text style={styles.tableText}>{`Table No ${name}`}</Text>
                </TouchableOpacity>
            );
        }
        return null;
    };



    return (
        <View style={{ paddingBottom: 50 }}>
            <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
                <PrimaryText color='black' align='center' >
                    {isTableAvailable == undefined
                        ? 'No table available'
                        : 'Feel free to choose any available table'
                    }
                </PrimaryText>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => <FilterList item={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    filterListItem: {
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: "#555459",
        borderRadius: 8,
        padding: 12, // Remove the duplicate padding property
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    tableText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#555459',
        lineHeight: 19,
    }
});

export default EmptyTable;
