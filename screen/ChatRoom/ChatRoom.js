import {View, Text, Dimensions, Alert} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {imageDummy1} from '../../assets/image/imageDummy';
import {TextInput, Animated} from 'react-native';
import {blue, darkBlue, lightblue, red} from '../../assets/color/color';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const ChatRoom = () => {
  const [number, onChangeNumber] = React.useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [layoutButtonMenu, setLayoutButtonMenu] = useState({});

  const navigation = useNavigation();

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!showMenu) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        if (showMenu) {
          setShowMenu(false);
        }
      }),
    [navigation, showMenu],
  );

  const slideAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const slideAnim2 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const slideAnim3 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const slideAnim4 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const slideAnim5 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const slideAnim6 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start(cb => {});

    Animated.timing(slideAnim2, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start(cb => {});
    Animated.timing(slideAnim3, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start(cb => {
      Animated.timing(slideAnim5, {
        toValue: Dimensions.get('screen').width,
        duration: 500,
        useNativeDriver: false,
      }).start(cb => {});
      Animated.timing(slideAnim6, {
        toValue: Dimensions.get('screen').width,
        duration: 1000,
        useNativeDriver: false,
      }).start(cb => {
        Animated.timing(slideAnim4, {
          toValue: 100,
          duration: 1000,
          useNativeDriver: false,
        }).start(cb => {
          Animated.timing(slideAnim4, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: false,
          }).start(cb => {});
        });
      });
    });
  }, [slideAnim, slideAnim2, slideAnim3]);

  return (
    <>
      <View
        onTouchStart={() => {
          if (showMenu) {
            setShowMenu(false);
          }
        }}
        style={{
          flex: 1,
          backgroundColor: lightblue[50],
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            backgroundColor: lightblue[700],
            borderRadius: 10,
          }}>
          <Animated.View
            style={{
              transform: [{translateX: slideAnim}],
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                left: -100,
              }}
              onPress={() => {
                navigation.navigate('ListChat');
              }}>
              <Icon color={lightblue[100]} name="arrow-left" size={30} />
              <Image
                source={{
                  uri: imageDummy1,
                }}
                height={40}
                width={40}
                borderRadius={50}
                style={{
                  borderColor: lightblue[300],
                  borderWidth: 2,
                }}
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              transform: [{translateY: slideAnim2}],
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}
              style={{
                paddingHorizontal: 5,
                flexDirection: 'row',
                alignItems: 'center',
                top: -100,
              }}>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 20,
                  fontWeight: '500',
                  color: lightblue[100],
                }}>
                Name User
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              flex: 0.5,
              right: slideAnim3,
            }}>
            <View
              style={{
                right: -100,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <TouchableOpacity>
                  <Icon color={lightblue[100]} name="video" size={30} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <Icon color={lightblue[100]} name="phone" size={30} />
                </TouchableOpacity>
              </View>
              <View
                onLayout={event => {
                  const layout = event.nativeEvent.layout;
                  setLayoutButtonMenu(layout);
                }}>
                <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                  <Icon color={lightblue[100]} name="dots-vertical" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
        <View
          style={{
            padding: 5,
            flex: 1,
          }}>
          {/* message 1 */}

          <Animated.View
            style={{
              left: slideAnim5,
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                left: -Dimensions.get('screen').width,
              }}>
              <View
                style={{
                  backgroundColor: lightblue[800],

                  padding: 5,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: lightblue[50],
                  }}>
                  Message 1
                </Text>
                <Text
                  style={{
                    color: lightblue[100],
                  }}>
                  10.12
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            style={{
              right: slideAnim6,
            }}>
            {/* message 2 */}
            <View
              style={{
                alignItems: 'flex-end',
                right: -Dimensions.get('screen').width,
              }}>
              <View
                style={{
                  backgroundColor: lightblue[700],
                  padding: 5,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: lightblue[50],
                  }}>
                  Message 2
                </Text>
                <Text
                  style={{
                    color: lightblue[100],
                  }}>
                  10.12
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>

        <Animated.View
          style={{
            bottom: slideAnim4,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              bottom: -100,
            }}>
            <TextInput
              onChangeText={onChangeNumber}
              value={number}
              placeholder="useless placeholder"
              style={{
                borderColor: lightblue[400],
                borderWidth: 1,
                borderRadius: 10,
                flex: 1,
                padding: 5,
              }}
            />
            <TouchableOpacity>
              <Icon name="send" size={40} color={lightblue[400]} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      {showMenu ? (
        <Menu
          show={showMenu}
          setShow={setShowMenu}
          layoutPosition={layoutButtonMenu}
        />
      ) : (
        <></>
      )}
    </>
  );
};

const Menu = ({show, setShow, layoutPosition}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim, // Bind opacity to animated value
        position: 'absolute',
        alignItems: 'flex-end',
        right: 0,
        top: 0,
      }}>
      <View
        style={{
          backgroundColor: lightblue[300],
          padding: 10,
          borderRadius: 5,
        }}>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: darkBlue[800],
            }}>
            Report Blokir <Icon name="flag" size={20} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: red[500],
            }}>
            Blokir <Icon name="block-helper" size={20} />
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

function ChatRoomScreen({navigation}) {
  // This hook returns `true` if the screen is focused, `false` otherwise
  const isFocused = useIsFocused();

  if (isFocused) {
    return <ChatRoom />;
  } else {
    return <Text>Loading . . .</Text>;
  }
}

export default ChatRoomScreen;
