import {
  View,
  Text,
  Dimensions,
  Alert,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {imageDummy1} from '../../assets/image/imageDummy';
import {TextInput, Animated, TouchableWithoutFeedback} from 'react-native';
import {blue, darkBlue, lightblue, red, yellow} from '../../assets/color/color';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {db} from '../VideoCall/utilities/firebase';
import {getData, keystorage} from '../../storage';
import {firebase} from '@react-native-firebase/messaging';
import BackroundBubble from '../../component/BackgroundBubble';
import EmojiPicker from 'rn-emoji-keyboard';
import waitFor from '../../utils/waitfor';
import Input from '../../component/Input/Input';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const ChatRoom = () => {
  const textInputRef = useRef();

  const [loadingSendMessage, setLoadingSendMessage] = useState(false);

  // const [number, setMessage] = React.useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [layoutButtonMenu, setLayoutButtonMenu] = useState({});

  const [listMessage, setListMessage] = useState([]);

  const [dataHim, setDataHim] = useState({
    email: '',
    name: 'Name user',
    password: '',
  });

  const navigation = useNavigation();

  const route = useRoute();

  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    db.collection('users')
      .doc(route.params.id)
      .get()
      .then(res => {
        setDataHim(res.data());
      });
  }, []);

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener('keyboardDidShow', () =>
  //     setKeyboardStatus('display'),
  //   );
  //   const hideSubscription = Keyboard.addListener('keyboardDidHide', () =>
  //     setKeyboardStatus('none'),
  //   );
  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, []);

  const checkKeyboards = () => {
    if (keyboardStatus === 'none') textInputRef.current?.blur();

    return true;
  };

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
      Animated.timing(slideAnim4, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start(cb => {});
    });
  }, [slideAnim, slideAnim2, slideAnim3]);

  const [message, setMessage] = useState('');

  const getMessage = async () => {
    try {
      let dataLogin = await getData({key: keystorage.login});

      const docMessage = await db
        .collection('message')
        .doc(`${dataLogin.id}-${route.params.id}`)
        .get();

      if (docMessage.exists) {
        db.collection('message')
          .doc(`${dataLogin.id}-${route.params.id}`)
          .onSnapshot(async documentSnapshot => {
            if (
              documentSnapshot.data() &&
              Object.keys(documentSnapshot.data()).length
            ) {
              const dataArray = [];
              for (const key in documentSnapshot.data()) {
                if (Object.hasOwnProperty.call(documentSnapshot.data(), key)) {
                  dataArray.push({...documentSnapshot.data()[key], id: key});
                }
              }
              let newData = dataArray.sort((a, b) => a.time - b.time);
              setListMessage(dataArray.sort((a, b) => a.time - b.time));
              if (isAtBottom) {
                scrollToBottom();
              }

              setLastChatForMe(
                dataLogin,
                dataArray[dataArray.length - 1].message,
              );
            } else {
              db.doc(`listChat/${dataLogin.id}`).update({
                [route.params.id]: firebase.firestore.FieldValue.delete(),
              });
              setListMessage([]);
            }
          });
      }
    } catch (err) {}
  };

  const [dataLogin, setDataLogin] = useState({});
  const flatListRef = useRef(null);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const sendMessage = async () => {
    setLoadingSendMessage(true);
    let time = new Date().getTime();
    if (dataLogin && message) {
      // ${dataLogin.id}-${route.params.id}
      let doc = await db
        .doc(`message/${dataLogin.id}-${route.params.id}`)
        .get();

      if (doc.exists) {
        await db
          .collection('message')
          .doc(`${dataLogin.id}-${route.params.id}`)
          .update({
            [time]: {
              from: dataLogin.id,
              message: message,
              read: true,
              time: new Date(),
              to: route.params.id,
              key: getRandomInt(1000, 50000000),
            },
          });
      } else {
        await db
          .collection('message')
          .doc(`${dataLogin.id}-${route.params.id}`)
          .set({
            [time]: {
              from: dataLogin.id,
              message: message,
              read: true,
              time: new Date(),
              to: route.params.id,
              key: getRandomInt(1000, 50000000),
            },
          });
        getMessage();
      }
      setLoadingSendMessage(false);

      const himToMe = await db
        .collection('message')
        .doc(`${route.params.id}-${dataLogin.id}`)
        .get();
      if (himToMe.exists) {
        await db
          .collection('message')
          .doc(`${route.params.id}-${dataLogin.id}`)
          .update({
            [time]: {
              from: dataLogin.id,
              message: message,
              read: true,
              time: new Date(),
              to: route.params.id,
              key: getRandomInt(1000, 50000000),
            },
          });
      } else {
        await db
          .collection('message')
          .doc(`${route.params.id}-${dataLogin.id}`)
          .set({
            [time]: {
              from: dataLogin.id,
              message: message,
              read: true,
              time: new Date(),
              to: route.params.id,
              key: getRandomInt(1000, 50000000),
            },
          });
      }

      setLastChatForHim(dataLogin, message);

      setMessage('');
      scrollToBottom();
    } else {
      setLoadingSendMessage(false);
    }
  };

  const setLastChatForMe = async (dataLogin, message) => {
    let listChatMe = await db.doc(`listChat/${dataLogin.id}`).get();

    if (listChatMe.exists) {
      db.collection('listChat')
        .doc(`${dataLogin.id}`)
        .update({
          [route.params.id]: {
            idSender: route.params.id,
            lastMessage: message,
            read: false,
            time: new Date(),
          },
        });
    } else {
      db.collection('listChat')
        .doc(`${dataLogin.id}`)
        .set({
          [route.params.id]: {
            idSender: route.params.id,
            lastMessage: message,
            read: false,
            time: new Date(),
          },
        });
    }
  };

  const setLastChatForHim = async (dataLogin, message) => {
    let listChatHim = await db.doc(`listChat/${route.params.id}`).get();
    if (listChatHim.exists) {
      await db
        .collection('listChat')
        .doc(`${route.params.id}`)
        .update({
          [dataLogin.id]: {
            idSender: dataLogin.id,
            lastMessage: message,
            read: false,
            time: new Date(),
          },
        });
    } else {
      await db
        .collection('listChat')
        .doc(`${route.params.id}`)
        .set({
          [dataLogin.id]: {
            idSender: dataLogin.id,
            lastMessage: message,
            read: false,
            time: new Date(),
          },
        });
    }
  };

  useEffect(() => {
    getData({key: keystorage.login}).then(dataLogin => {
      setDataLogin(dataLogin);
    });
  }, []);

  useEffect(() => {
    getMessage();
  }, []);

  const [isAtBottom, setIsAtBottom] = useState(false);

  const onScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const viewHeight = event.nativeEvent.layoutMeasurement.height;

    // Menghitung jarak dari bagian bawah
    const distanceFromBottom = contentHeight - offsetY - viewHeight;

    // Toleransi jarak dari bawah sebelum dianggap berada di bagian bawah
    const tolerance = 10;
    if (distanceFromBottom <= tolerance) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableWithoutFeedback>
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
          <BackroundBubble />
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
                  navigation.goBack();
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
                  navigation.navigate('Profile', route.params.id);
                }}
                style={{
                  paddingHorizontal: 5,
                  // flexDirection: 'row',
                  // alignItems: 'center',
                  top: -100,
                }}>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 20,
                    fontWeight: '500',
                    color: lightblue[100],
                  }}>
                  {dataHim.name}
                </Text>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 15,
                    fontWeight: '400',
                    color: lightblue[100],
                  }}>
                  <Text
                    style={{
                      color: blue[200],
                    }}>
                    active
                  </Text>
                  /
                  <Text
                    style={{
                      color: blue[400],
                    }}>
                    inactive
                  </Text>
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
                    <Icon
                      color={lightblue[100]}
                      name="dots-vertical"
                      size={30}
                    />
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

            <FlatList
              initialNumToRender={listMessage.length}
              ref={flatListRef}
              data={listMessage}
              renderItem={({item, index}) =>
                item.from === dataLogin.id ? (
                  <FromMe item={item} index={index} />
                ) : (
                  <FromHim item={item} index={index} />
                )
              }
              keyExtractor={item => {
                return item.key || item.time.seconds;
              }}
              onScroll={onScroll}
            />
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
              <TouchableOpacity>
                <EmojiPicker
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  onEmojiSelected={e => setMessage(e)}
                  expandable={false}
                />
                <Icon
                  name="emoticon-outline"
                  size={40}
                  color={lightblue[400]}
                  onPress={() => setIsOpen(true)}
                />
              </TouchableOpacity>
              <Input
                refs={textInputRef}
                onPressIn={checkKeyboards}
                onChangeText={setMessage}
                value={message}
                onFocus={() => {
                  // textInputRef.current.setNativeProps({keyboardType: 'emoji'});
                }}
                placeholder="type messages"
                // keyboardType="default"
                style={{
                  borderColor: lightblue[400],
                  borderWidth: 1,
                  borderRadius: 10,
                  flex: 1,
                  padding: 5,
                }}
              />
              <TouchableOpacity>
                <Icon name="camera-outline" size={40} color={lightblue[400]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sendMessage()}>
                {loadingSendMessage ? (
                  <ActivityIndicator color={lightblue[400]} size={'large'} />
                ) : (
                  <Icon name="send" size={40} color={lightblue[400]} />
                )}
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
    </TouchableWithoutFeedback>
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

const FromMe = ({item}) => {
  const slide = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  useEffect(() => {
    Animated.timing(slide, {
      toValue: Dimensions.get('screen').width,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const resetAnimation = async () => {
    await Animated.timing(slide, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    await waitFor(1000);
    return;
  };

  const route = useRoute();

  const removeMessage = async () => {
    await resetAnimation();

    // Create a document reference
    const dataLogin = await getData({key: keystorage.login});
    const cityRef1 = db
      .collection('message')
      .doc(`${dataLogin.id}-${route.params.id}`);
    // Remove the 'capital' field from the document
    await cityRef1.update({
      [item.id]: firebase.firestore.FieldValue.delete(),
    });
  };

  return (
    <Animated.View
      style={{
        right: slide,
        marginVertical: 2,
      }}>
      {/* message 2 */}

      <View
        style={{
          right: -Dimensions.get('screen').width,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            // position: 'absolute',
            // left: 0,
            zIndex: 1,
          }}>
          <TouchableOpacity onPress={() => removeMessage()}>
            <Icon name="trash-can" size={40} color={lightblue[700]} />
          </TouchableOpacity>
        </View>
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
            {item.message}
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
  );
};

const FromHim = ({item, index}) => {
  const slide = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  useEffect(() => {
    Animated.timing(slide, {
      toValue: Dimensions.get('screen').width,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const resetAnimation = async () => {
    await Animated.timing(slide, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    await waitFor(1000);
    return;
  };

  const route = useRoute();

  const removeMessage = async () => {
    await resetAnimation();
    // Create a document reference
    const dataLogin = await getData({key: keystorage.login});
    const cityRef1 = db
      .collection('message')
      .doc(`${dataLogin.id}-${route.params.id}`);

    // Remove the 'capital' field from the document
    await cityRef1.update({
      [item.id]: firebase.firestore.FieldValue.delete(),
    });
  };
  return (
    <Animated.View
      style={{
        left: slide,
        marginVertical: 2,
      }}>
      <View
        style={{
          alignItems: 'flex-start',
          left: -Dimensions.get('screen').width,
          flexDirection: 'row',
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
            {item.message}
          </Text>
          <Text
            style={{
              color: lightblue[100],
            }}>
            10.12
          </Text>
        </View>
        <View
          style={{
            // position: 'absolute',
            // left: 0,
            zIndex: 1,
          }}>
          <TouchableOpacity onPress={() => removeMessage()}>
            <Icon name="trash-can" size={40} color={lightblue[700]} />
          </TouchableOpacity>
        </View>
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
