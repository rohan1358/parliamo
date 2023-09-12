import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import {lightblue, yellow} from '../../assets/color/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ModalFailedRegister = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontSize: 20,
              color: yellow[700],
              fontWeight: 'bold',
            }}>
            Register Failed
          </Text>
          <LottieView
            source={require('./lottie-failed-login.json')}
            autoPlay
            loop
            style={{
              height: 300,
              width: 300,
            }}
            speed={0.6}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              color: yellow[700],
              fontWeight: 'bold',
            }}>
            Email yang anda masukan, sudah pernah digunakan
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              padding: 10,
              elevation: 2,
              backgroundColor: lightblue[600],
              marginTop: 10,
            }}
            activeOpacity={0.5}
            onPress={() => setModalVisible(!modalVisible)}>
            <Icon
              name="close"
              size={20}
              color={lightblue[100]}
              style={{
                fontWeight: 900,
              }}
              fontWeight="700"
              weight={700}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalFailedRegister;
