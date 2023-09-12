import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { lightblue, red } from '../../assets/color/color';
import { imageDummy1 } from '../../assets/image/imageDummy';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { keystorage, removeData } from '../../storage';

// const sleep = ms => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// };

let listSettings = [
  {
    icon: 'key-variant',
    label: 'Account',
    description: 'Security notifications, change number',
    id: Math.random(),
  },
  {
    icon: 'lock',
    label: 'Privacy',
    description: 'Block contacts, disappearing messages',
    id: Math.random(),
  },
  {
    icon: 'message-text',
    label: 'Chats',
    description: 'Theme, Wallpapers, chat history',
    id: Math.random(),
  },
  {
    icon: 'bell',
    label: 'Notifications',
    description: 'Message, group & call tones',
    id: Math.random(),
  },
];

const languages = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Swift'];

const close = 0;

const Settings = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonLogoutAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const slideAnim3 = useRef(new Animated.Value(-100)).current;
  const slideAnim4 = useRef(new Animated.Value(0)).current;

  const [showListSettings, setShowListSettings] = useState(false);

  useEffect(() => {
    Animated.timing(buttonLogoutAnim, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: 
      
      false,
    }).start(



    )
  }, [])

  const openListLanguage = () => {
    Animated.timing(slideAnim4, {
      toValue: Dimensions.get('window').height / 3,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setDirection(Dimensions.get('window').height / 3);
    });
  };

  useEffect(() => {
    listSettings[4] = {
      icon: 'translate',
      label: 'App Language',
      description: "English (phone's language)",
      id: Math.random(),
      handleClick: openListLanguage,
    };

    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => { });

    Animated.timing(slideAnim3, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        setShowListSettings(true);
      });
    });
  }, [fadeAnim]);

  const [direction, setDirection] = useState(close);
  const [lastDirection, setLastDirection] = useState('up');

  useEffect(() => {
    Animated.timing(slideAnim4, {
      toValue: close,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setDirection(close);
    });
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      const { dy } = gestureState;

      Animated.timing(slideAnim4, {
        toValue: direction - dy,
        duration: 0,
        useNativeDriver: false,
      }).start(() => {
        if (dy > 0) {
          setLastDirection('down');
          setDirection(direction => direction - dy);
        } else if (dy < 0) {
          setLastDirection('up');
          setDirection(direction => direction - dy);
        } else {
          setLastDirection('down');

          setDirection(direction);
        }
      });
    },
    onPanResponderEnd: () => {
      if (lastDirection === 'up') {
        Animated.timing(slideAnim4, {
          toValue: Dimensions.get('window').height - 100,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          setDirection(Dimensions.get('window').height - 100);
        });
      } else {
        Animated.timing(slideAnim4, {
          toValue: close,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          setDirection(close);
        });
      }
    },
  });

  const handleLogout = () => {
    removeData({ key: keystorage.login }).then(res => {
      navigation.navigate('Login');
    });
  };

  return (
    <>
      <Animated.View
        style={{
          opacity: fadeAnim2,
          flex: 1,
          backgroundColor: lightblue[700],
        }}
        // {...{}}
        {...(!direction ? {} : panResponder.panHandlers)}>
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: lightblue[600],
              paddingVertical: 10,
            }}>
            <Animated.View
              style={{
                left: slideAnim3,
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
                top: slideAnim3,
                flex: 1,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: lightblue[100],
                }}>
                Settings
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                right: slideAnim3,
              }}>
              <Icon name="magnify" size={25} color={lightblue[100]} />
            </Animated.View>
          </View>
          <Animated.View
            style={{
              opacity: fadeAnim,
              paddingHorizontal: 5,
              marginVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyProfile')}>
                <Image
                  source={{
                    uri: imageDummy1,
                  }}
                  height={50}
                  width={50}
                  borderRadius={50}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 5,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: lightblue[100],
                  }}>
                  Name User
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: lightblue[200],
                  }}>
                  Hey there! I am using Parliamo
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    navigation.navigate('QrCode');
                  }}>
                  <Icon name="qrcode" size={40} color={lightblue[200]} />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
          {showListSettings ? (
            <>
              {listSettings.map((data, index) => {
                return (
                  <ListSettingsComponent
                    key={data.id}
                    label={data.label}
                    description={data.description}
                    icon={data.icon}
                    id={data.id}
                    handleClick={data.handleClick}
                    delay={index * 500}
                  />
                );
              })}
            </>
          ) : (
            <></>
          )}
          <Animated.View style={{
            opacity: buttonLogoutAnim


            







          }}>
            <TouchableOpacity
              style={{
                backgroundColor: red[400],
                padding: 10,
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 10,
              }}
              onPress={() => handleLogout()}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: lightblue[100],
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </Animated.View>

        </>
      </Animated.View>

      <Animated.View
        style={{
          backgroundColor: lightblue[200],
          borderRadius: 10,
          height: slideAnim4,
          position: 'absolute',
          width: '100%',
          bottom: 0,
          flex: 1,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 10,
            borderRadius: 5,
            paddingVertical: 2,
            paddingHorizontal: '20%',
          }}
          {...panResponder.panHandlers}>
          <View
            style={{
              width: '50%',
              height: 10,
              backgroundColor: lightblue[400],
              alignSelf: 'center',
              borderRadius: 5,
            }}></View>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          {languages.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderBottomWidth: 1,
                  borderColor: lightblue[300],
                }}>
                <Text
                  style={{
                    color: lightblue[500],
                    fontSize: 20,
                  }}>
                  {data}
                </Text>
              </View>
            );
          })}
        </View>
      </Animated.View>
    </>
  );
};

const ListSettingsComponent = ({
  label,
  description,
  icon,
  id,
  delay,
  handleClick,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('screen').width,
      duration: 500,
      useNativeDriver: false,
      delay: delay,
    }).start();
    Animated.timing(slideAnim2, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
      delay: delay,
    }).start();
  }, [slideAnim, slideAnim2]);

  return (
    <TouchableOpacity
      key={id}
      activeOpacity={0.5}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      }}
      onPress={() => {
        if (handleClick) {
          handleClick();
        }
      }}>
      <Animated.View
        style={{
          left: slideAnim2,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            left: -100,
          }}>
          <Icon name={icon} color={lightblue[50]} size={20} />
        </View>
      </Animated.View>

      <Animated.View
        style={{
          right: slideAnim,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            right: -Dimensions.get('screen').width,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: lightblue[50],
            }}>
            {label}
          </Text>
          <Text
            style={{
              color: lightblue[200],
            }}>
            {description}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const focus = useIsFocused();
  if (focus) {
    return <Settings />;
  } else {
    return (
      <View>
        <Text>Loading . . .</Text>
      </View>
    );
  }
};

export default SettingsScreen;
