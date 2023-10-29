import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Animated,
  Dimensions,
  Keyboard,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {lightblue} from '../../assets/color/color';
import {db} from '../VideoCall/utilities/firebase';
import {keystorage, storeData} from '../../storage';

const {height} = Dimensions.get('window');

const ModalEdit = ({
  modalVisible,
  setModalVisible,
  dataLogin,
  keys = 'name',
}) => {
  const anim = useRef(new Animated.Value(-height)).current;

  // const [] = useState(false);
  const [state, setState] = useState('');

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(anim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        // setShowListSettings(true);
      });
    } else {
      Animated.timing(anim, {
        toValue: -height,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        // setShowListSettings(true);
      });
    }
  }, [modalVisible]);

  const onSubmit = () => {
    db.collection('users')
      .doc(dataLogin.id)
      .update({[keys]: state})
      .then(res => {
        storeData({
          key: keystorage.login,
          value: {...dataLogin, [keys]: state},
        });
        setModalVisible(!modalVisible);
        setState('');
        Keyboard.dismiss();
      })
      .catch(err => {});
  };

  return (
    <Animated.View
      style={[styles.centeredView, {flex: 1, zIndex: 1, bottom: anim}]}>
      <View style={styles.modalView}>
        {keys === 'name' && (
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: lightblue[600]}}>
            Enter your name
          </Text>
        )}

        {keys === 'about' && (
          <Text
            style={{fontSize: 20, fontWeight: 'bold', color: lightblue[600]}}>
            Type about you
          </Text>
        )}

        <TextInput
          onChangeText={e => {
            setState(e);
          }}
          value={state}
          style={{
            width: '100%',
            borderColor: lightblue[700],
            borderBottomWidth: 2,
            marginVertical: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.buttonClose, {marginHorizontal: 5}]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.buttonClose, {marginHorizontal: 5}]}
            onPress={() => onSubmit()}>
            <Text style={styles.textStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    width: '100%',
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
    // elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalEdit;
