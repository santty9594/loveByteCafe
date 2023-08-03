import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {FAB} from 'react-native-paper';
import MenuCard from '../Components/MenuCard';
import {BottomModalComponent} from '../Components/BottomModalComponent';

const MenuScreen = () => {
  const [selectedId, setSelectedId] = useState();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const categoriesData = [
    {id: '1', name: 'All'},
    {id: '2', name: 'Appetizers'},
    {id: '3', name: 'Main Course'},
    {id: '4', name: 'Desserts'},
    {id: '5', name: 'Entrees'},
    {id: '6', name: 'Hot Beverages'},
    {id: '7', name: 'Cold Beverages'},
  ];

  const menuItemsData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'First Item',
      category: 'Appetizers',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Butter Chicken Rice Bowl',
      category: 'Appetizers',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d709',
      name: 'Butter Chicken Nachos',
      category: 'Appetizers',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e1234',
      name: 'Butter Chicken Fries',
      category: 'Main Course',
    },
    {
      id: '58694a0f-Main Courseda1-471f-bd96-145571e2hih',
      name: 'Pizza',
      category: 'Main Course',
    },
    {
      id: '58694a0f-Main Courseda1-471f-bd96-145571e29654',
      name: 'Burger',
      category: 'Main Course',
    },
    {
      id: '58694a0f-Main Courseda1-471f-bd96-145571e29d72',
      name: 'Butter Chicken Roll',
      category: 'Desserts',
    },
    {
      id: '58694a0f-3da1-471f-bd96-c737773',
      name: 'Third Item 4 -6',
      category: 'Desserts',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e2hiuhcf2',
      name: 'Third Item 4-5',
      category: 'Desserts',
    },
    {
      id: '58694a0f-3da1-471f-bd96-djdjjd',
      name: 'Third Item 4-4',
      category: 'Desserts',
    },
    {
      id: '58694a0f-3da1-471f-bd96-93ojdojdojol',
      name: 'Third Item 4-3',
      category: 'Desserts',
    },
    {
      id: '58694a0f-3da1-471f-bd96-jbdjbejb6436',
      name: 'Third Item 4 -2',
      category: 'Desserts',
    },
    {
      id: '58694a0f-3da1-471f-bd96-1276teggvduu',
      name: 'Third Item 7 -2',
      category: 'Entrees',
    },
    {
      id: '58694a0f-3da1-471f-bd96-7763gdi8hi',
      name: 'Third Item 3 1',
      category: 'Cold Beverages',
    },
    {
      id: '58694a0f-3da1-471f-bd96-i9y3whiuhdki',
      name: 'Third Item 3',
      category: 'Cold Beverages',
    },
    {
      id: '58694a0f-3da1-471f-bd96-14bjbdkckes',
      name: 'Third Item 4-1',
      category: 'Cold Beverages',
    },
    {
      id: '58694a0f-3da1-471f-bd96-1ncnknkjnx',
      name: 'Third Item 4',
      category: 'Hot Beverages',
    },
    {
      id: '58694a0f-3da1-471f-bd96-14kncxkn09u9h',
      name: 'Third Item Cold Beverages',
      category: 'Cold Beverages',
    },
    {
      id: '58694a0f-3da1-471f-bd96-7827bomdpiiihd',
      name: 'Third Item 5',
      category: 'Cold Beverages',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d7ti',
      name: 'Third Item 6',
      category: 'Cold Beverages',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e291ii1',
      name: 'Third Item 6-1',
      category: 'Cold Beverages',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e2vhcvjve',
      name: ' category item noumer 1',
      category: 'Entrees',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571ehbcugueh',
      name: 'cate 7',
      categoryId: 'Entrees',
    },
  ];

  const filteredMenuItems =
    selectedCategory === '1'
      ? menuItemsData
      : menuItemsData.filter(
          item =>
            item.category ===
            categoriesData.find(cat => cat.id === selectedCategory).name,
        );

  renderItem = ({item}) => {
    return <MenuCard item={item} />;
  };

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {backgroundColor: selectedCategory === item.id ? '#4CAF50' : '#E0E0E0'},
      ]}
      onPress={() => setSelectedCategory(item.id)}>
      <Text style={{color: selectedCategory === item.category ? '#fff' : '#000'}}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categoriesData}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={filteredMenuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
        numColumns={2}
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#add8e6',
  },
  categoryContainer: {
    marginBottom: 16,
    margin:10
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    // marginRight: 8,
    // borderRadius: 8,
  },
});
