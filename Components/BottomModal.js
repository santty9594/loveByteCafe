import React from 'react';
import { View } from 'react-native';
import {
  ModalContent,
  BottomModal,
} from 'react-native-modals';

const BottomModalComponent = (props) => {
  let { isModal, borderRadius, height, handleCloseModal } = props;
  return (
    <View>
      <BottomModal
        visible={isModal}
        onTouchOutside={() => handleCloseModal()}
        height={height}
        hasOverlay={true}
        useNativeDriver={true}
        propagateSwipe={true}
        swipeDirection={['down']}
        width={1}
        onHardwareBackPress={() => {
          handleCloseModal();
          return true;
        }}
        modalStyle={{
          borderRadius: borderRadius !== undefined ? borderRadius : 10
        }}
      >
        <ModalContent
          style={{
            flex: 1,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 10,
            paddingBottom: 0,
          }}
        >
          {props.children}
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export { BottomModalComponent };
