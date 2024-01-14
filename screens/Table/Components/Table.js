import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, ScrollView } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { BottomModalComponent } from '../../../Components/BottomModal';
import PrimaryText from '../../../Components/PrimaryText';
import EmptyTabel from './EmptyTable';
import colors from '../../../constants/colors';

const BoxWithMargin = ({
  items, selectCategory,
  handleClicked, handleShitTable,
  handleResetTable
}) => {

  let width = Dimensions.get('window').width;
  const [modal, setModal] = React.useState({ isModal: false, data: {} });
  const BOX_SIZE = width > 400 ? 200 : 140;
  const filteredItems = items?.filter(item => item.tableType === selectCategory);


  const handleSelectedTable = (value) => {
    handleShitTable(modal.data, value);
    setModal({ isModal: false, data: {} })
  }

  const ModalInput = () => {
    let { isModal, data } = modal
    return (
      <BottomModalComponent
        isModal={isModal}
        height={0.4}
        handleCloseModal={() => setModal({ isModal: false, data: {} })}
      >
        <EmptyTabel
          selectCategory={selectCategory}
          items={items}
          handleSelectedTable={handleSelectedTable}
        />
      </BottomModalComponent >
    )
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {filteredItems.map((item, i) => (
          <TouchableOpacity
            style={item.booked ? [
              styles.box,
              {
                borderWidth: 3,
                borderColor: colors.tableColor,
                width: BOX_SIZE,
                height: BOX_SIZE,
                backgroundColor: '#fff',
              },
            ] : [
              styles.box,
              {
                width: BOX_SIZE,
                height: BOX_SIZE,
                backgroundColor: '#fff',
              },
            ]}
            onPress={() => handleClicked(item)}
            key={i}
          >
            {item.booked ? (
              <>
                <TouchableOpacity style={styles.shit} onPress={() => setModal({ isModal: true, data: item })}>
                  <RemixIcon name='exchange-line' color='#fff' size={18} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.reset} onPress={() => handleResetTable(item)}>
                  <RemixIcon name='restart-line' color='#000' size={18} />
                </TouchableOpacity>
                <View style={styles.alignItems}>
                  <PrimaryText color='black'>{item.name}</PrimaryText>
                  <PrimaryText color='blue'>Booked</PrimaryText>
                </View>
              </>
            ) : (
              <View style={styles.alignItems}>
                <PrimaryText color='black'>{item.name}</PrimaryText>
                <PrimaryText color='black'>Available</PrimaryText>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {ModalInput()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 16,
  },
  alignItems: {
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    margin: 16,
    marginBottom: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shit: {
    justifyContent: "center",
    alignItems: "center",
    top: 10,
    left: 10,
    position: "absolute",
    backgroundColor: "#FF8832",
    height: 30,
    width: 30,
    borderRadius: 50
  },
  reset: {
    justifyContent: "center",
    alignItems: "center",
    top: 10,
    right: 10,
    position: "absolute",
    backgroundColor: "#FFEEB4",
    height: 30,
    width: 30,
    borderRadius: 50
  },

});

export default BoxWithMargin;