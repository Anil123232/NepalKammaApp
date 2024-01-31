import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Cards from '../GlobalComponents/Cards';

const Create = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          style={{
            backgroundColor: 'white', // <==== HERE
            borderRadius: 24,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.1,
            shadowRadius: 24,
            elevation: 10,
          }}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          {/* <View className="flex flex-1 items-center rounded-t-2xl"> */}
          <Cards />
          {/* </View> */}
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default Create;
