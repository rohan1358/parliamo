import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {lightblue} from '../../assets/color/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlatList} from 'react-native-gesture-handler';
import {imageDummy1} from '../../assets/image/imageDummy';
import {useNavigation} from '@react-navigation/native';
import ScanCode from './ScanCode';
const MyCode = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: lightblue[500],
          margin: 5,
          borderRadius: 10,
          padding: 50,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: imageDummy1,
          }}
          height={70}
          width={70}
          borderRadius={50}
          style={{
            // marginBottom: -50,
            position: 'absolute',
            zIndex: 1,
            top: -35,
            borderColor: lightblue[500],
            borderWidth: 5,
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            color: lightblue[100],
          }}>
          Name User
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: lightblue[200],
          }}>
          Parliamo Contact
        </Text>
        <View
          style={{
            backgroundColor: lightblue[100],
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Icon name="qrcode" size={200} color={lightblue[900]} />
        </View>
      </View>
      <View
        style={{
          width: '80%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
          }}>
          Your QR code is private. If you share it with someone, they can scan
          it with their Parliamo camera to add you as a contact.
        </Text>
      </View>
    </>
  );
};

const data = [
  {id: '1', element: <MyCode />},
  {id: '2', element: <ScanCode />},
];

const renderItem = ({item}) => (
  <>
    <View
      style={{
        width: Dimensions.get('window').width, // Adjust the width as needed
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      {item.element}
    </View>
  </>
);

const QrCode = () => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const flatListRef = useRef(null);
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [slideAnim]);

  const slideAnim2 = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const width = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);

    Animated.timing(slideAnim2, {
      toValue: Math.round(offsetX / 2),
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  const scrollToIndex = index => {
    flatListRef.current.scrollToIndex({index, animated: true});
  };

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lightblue[700],
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: lightblue[600],
          paddingVertical: 10,
        }}>
        <Animated.View
          style={{
            left: slideAnim,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-left" size={25} color={lightblue[100]} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            top: slideAnim,
            flex: 1,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 25,
              color: lightblue[100],
            }}>
            QR Code
          </Text>
        </Animated.View>
        {currentIndex === 0 ? (
          <>
            <Animated.View
              style={{
                right: slideAnim,
                marginHorizontal: 5,
              }}>
              <Icon name="share-variant" size={25} color={lightblue[100]} />
            </Animated.View>
            <Animated.View
              style={{
                right: slideAnim,
                marginHorizontal: 5,
              }}>
              <Icon name="dots-vertical" size={25} color={lightblue[100]} />
            </Animated.View>
          </>
        ) : (
          <></>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          backgroundColor: lightblue[600],
          paddingVertical: 10,
        }}>
        <View
          onTouchStart={() => scrollToIndex(0)}
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: lightblue[50],
            }}>
            My Code
          </Text>
        </View>
        <View
          onTouchStart={() => scrollToIndex(1)}
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: lightblue[50],
            }}>
            Scan Code
          </Text>
        </View>
      </View>
      <Animated.View
        style={{
          width: Dimensions.get('window').width / 2,
          height: 5,
          backgroundColor: lightblue[300],
          left: slideAnim2,
        }}
      />
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal // This prop makes the FlatList scroll horizontally
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        indicatorStyle="black"
      />
    </View>
  );
};

export default QrCode;
