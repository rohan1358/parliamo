import React, {useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {blue, darkBlue, lightblue} from '../assets/color/color';

const ContainedButton = ({
  user = 'Name User',
  message = 'Message',
  time = '12.25',
  onPress,
  you = false,
  newMessage = false,
  slideDuration = 1000,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: -Dimensions.get('screen').width, // Menggeser ke kiri sejauh 500 satuan (misalnya pixel)
      duration: 500, // Durasi animasi dalam milidetik (1 detik)
      useNativeDriver: false, // Setel false jika Anda ingin menggunakan layout animation
      delay: slideDuration,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{transform: [{translateX: fadeAnim}]}}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.button,
          styles.elevation,
          newMessage ? styles.bgActive : styles.bgInActive,
        ]}
        onPress={onPress}>
        <Image
          source={{
            uri: imageDummy,
          }}
          height={30}
          width={30}
          borderRadius={50}
        />
        <View
          style={{
            marginHorizontal: 10,
            flex: 1,
          }}>
          <Text style={styles.text}>{user}</Text>
          <Text style={styles.text}>{message} </Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          {you ? (
            <>
              <Icon name="check-all" size={20} color="#900" />
              <Text style={styles.text}>{time}</Text>
            </>
          ) : (
            <Text style={styles.text}>{time}</Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2.5,
    marginHorizontal: 2,
    right: -Dimensions.get('screen').width,
  },
  bgActive: {
    backgroundColor: lightblue[700],
  },
  bgInActive: {
    backgroundColor: lightblue[500],
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF', // Warna teks menjadi putih agar kontras dengan latar belakang biru
  },
  elevation: {
    elevation: 30,
    shadowColor: darkBlue[400],
  },
});

const imageDummy =
  'data:image/jpeg;base64,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';

export default ContainedButton;
