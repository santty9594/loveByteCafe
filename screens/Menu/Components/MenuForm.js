import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MenuCard from './MenuCard';

const MenuScreen = ({ menusItems, menuCategory, handleCardClick }) => {
  const [selectedId, setSelectedId] = useState();
  const [menus,] = useState(menusItems);
  const [selectedCategory, setSelectedCategory] = useState(0);


  const filteredMenuItems = selectedCategory === 0
    ? menusItems
    : menusItems.filter(
      item =>
        item.menuid ===
        menuCategory.find(cat => cat.menu_id === selectedCategory)?.menu_id,
    );

  renderItem = ({ item }) => {
    return <MenuCard onPress={() => handleCardClick(item)} item={item} />;
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, { backgroundColor: selectedCategory === item.menu_id ? '#4CAF50' : '#E0E0E0' }]}
      onPress={() => setSelectedCategory(item.menu_id)}>
      <Text style={{ color: selectedCategory === item.menu_id ? '#fff' : '#000' }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={menuCategory}
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
  },
  categoryContainer: {
    marginBottom: 16,
    margin: 10,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    // borderRadius: 8,
  },
});
