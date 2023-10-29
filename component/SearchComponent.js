import {
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {lightblue, blue} from '../assets/color/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchComponent = ({setClose, onChangeText = () => {}}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start(cb => {});
  }, [slideAnim]);

  const closeComponent = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 500,
      useNativeDriver: false,
    }).start(cb => {
      if (setClose) {
        setClose(false);
      }
    });
  };

  return (
    <Animated.View
      style={{
        top: slideAnim,
        position: 'absolute',
        zIndex: 2,
      }}>
      <View
        style={{
          backgroundColor: lightblue[400],
          top: -100,
          flex: 1,
          width: Dimensions.get('screen').width,
          borderRadius: 10,
          borderColor: blue[500],
          borderWidth: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            // alignContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => closeComponent()}>
            <Icon
              name="arrow-left"
              size={30}
              style={{
                color: lightblue[900],
              }}
            />
          </TouchableOpacity>
          <TextInput
            onChangeText={onChangeText}
            style={{
              color: lightblue[900],
              fontSize: 20,
              flex: 1,
            }}
            autoFocus={true}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default SearchComponent;
