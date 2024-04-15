import React, {useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';

const DistanceOption = ({
  setModalVisible,
  modalVisible,
  setSelectedDistance,
  selectedDistance,
}: any) => {
  const handleDistanceSelection = (distance: any) => {
    setSelectedDistance(distance);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text
          className="text-black w-[137px] py-3 border-b-2 border-black"
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: responsiveFontSize(2),
          }}>
          Distance{selectedDistance ? `: ${selectedDistance}km` : ''}
        </Text>
      </TouchableOpacity>

      <Modal isVisible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleDistanceSelection(0)}>
              <Text style={styles.modalOptionText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleDistanceSelection(5)}>
              <Text style={styles.modalOptionText}>5km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleDistanceSelection(10)}>
              <Text style={styles.modalOptionText}>10km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleDistanceSelection(20)}>
              <Text style={styles.modalOptionText}>20km</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleDistanceSelection(30)}>
              <Text style={styles.modalOptionText}>30km</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalOption: {
    paddingVertical: 12,
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    color: 'black',
  },
});

export default React.memo(DistanceOption);
