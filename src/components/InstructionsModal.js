import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../Styles/gameStyles";

const InstructionsModal = ({ visible, onClose, instructions }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalView}>
      <Text style={styles.modalText}>{instructions}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default InstructionsModal;
