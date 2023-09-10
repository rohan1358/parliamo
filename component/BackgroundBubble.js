import React, {useState, useEffect, useRef} from 'react';
import {Animated, View, Dimensions} from 'react-native';
import {lightblue} from '../assets/color/color';

const {height, width} = Dimensions.get('window');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BackroundBubble = () => {
  const slideAnim8 = useRef(new Animated.Value(0)).current;
  const slideAnim9 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    open();
    open2();
  }, []);

  const open = () => {
    // Menghasilkan angka acak antara 100 dan 500
    var randomNumber = getRandomNumber(1000, 1500);
    var toValue = getRandomNumber(height / 5, height / 3);

    Animated.timing(slideAnim8, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        open();
      }, randomNumber);
    });
  };

  const open2 = () => {
    // Menghasilkan angka acak antara 1000 dan 1500
    var randomNumber = getRandomNumber(1000, 1500);
    var toValue = getRandomNumber(height / 4, height / 3);
    Animated.timing(slideAnim9, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        open2();
      }, randomNumber);
    });
  };
  return (
    <>
      <Animated.View
        style={{
          width: '70%',
          position: 'absolute',
          height: slideAnim8,
          backgroundColor: lightblue[200],
          right: 0,
          top: 0,
          borderBottomLeftRadius: height / 2,
        }}
      />

      <Animated.View
        style={{
          width: '70%',
          position: 'absolute',
          height: slideAnim9,
          backgroundColor: lightblue[200],
          left: 0,
          bottom: 0,
          borderTopRightRadius: height / 2,
        }}
      />
    </>
  );
};

export default BackroundBubble;
