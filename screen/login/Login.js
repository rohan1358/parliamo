import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {lightblue} from '../../assets/color/color';

import parliamoImg from '../../assets/image/parliamo.png';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {db} from '../VideoCall/utilities/firebase';
import {getData, keystorage, storeData} from '../../storage';
import BackroundBubble from '../../component/BackgroundBubble';

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const getNumFruit = fruit => {
  return sleep(2000).then(v => fruit);
};

const textParliamo = ['P', 'A', 'R', 'L', 'I', 'A', 'M', 'O'];

const Login = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [value, setValue] = useState({email: '', password: ''});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideAnim2 = useRef(new Animated.Value(0)).current;
  const slideAnim3 = useRef(new Animated.Value(0)).current;
  const slideAnim4 = useRef(new Animated.Value(0)).current;
  const slideAnim5 = useRef(new Animated.Value(-250)).current;
  const slideAnim6 = useRef(new Animated.Value(0)).current;
  const slideAnim7 = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {
    if (currentIndex < textParliamo.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + textParliamo[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 50);

      return () => {
        clearTimeout(timeout);

        if (currentIndex === 7) {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }).start(cb => {
            Animated.timing(fadeAnim2, {
              toValue: 1,
              duration: 500,
              useNativeDriver: false,
            }).start(cb => {
              Animated.timing(slideAnim, {
                toValue: 33.45454406738281,
                duration: 500,
                useNativeDriver: false,
              }).start(cb => {});
              Animated.timing(fadeAnim3, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
              }).start(cb => {
                Animated.timing(slideAnim2, {
                  toValue: Dimensions.get('screen').width,
                  duration: 500,
                  useNativeDriver: false,
                }).start(cb => {
                  Animated.timing(slideAnim3, {
                    toValue: Dimensions.get('screen').width,
                    duration: 500,
                    useNativeDriver: false,
                  }).start(cb => {
                    Animated.timing(slideAnim4, {
                      toValue: -200,
                      duration: 500,
                      useNativeDriver: false,
                    }).start(cb => {
                      Animated.timing(slideAnim5, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: false,
                      }).start(cb => {
                        Animated.timing(slideAnim6, {
                          toValue: Dimensions.get('screen').width / 2,
                          duration: 500,
                          useNativeDriver: false,
                        }).start(cb => {});
                        Animated.timing(slideAnim7, {
                          toValue: Dimensions.get('screen').width / 2,
                          duration: 500,
                          useNativeDriver: false,
                        }).start(cb => {});
                      });
                    });
                  });
                });
              });
            });
          });
        }
      };
    }
  }, [currentIndex, textParliamo, fadeAnim, slideAnim, fadeAnim2]);

  const handleLogin = async () => {
    db.collection('users')
      .where('email', '==', value.email)
      .where('password', '==', value.password)
      .get()
      .then(res => {
        storeData({
          key: keystorage.login,
          value: {...res.docs[0].data(), id: res.docs[0].id},
        });
        navigation.navigate('ListChat');
      })
      .catch(err => {});
  };

  useEffect(() => {
    // handleLogin();
  }, []);

  const handleChange = (values = '', names = '') => {
    setValue(value => {
      return {...value, [names]: values};
    });
  };

  return (
    <View style={styles.container}>
      <BackroundBubble />
      <Text
        style={{
          fontWeight: '700',
          fontSize: 30,
          letterSpacing: 2,
          color: lightblue[500],
        }}>
        {currentText}
      </Text>

      <View
        style={{
          width: '70%',
          marginBottom: 15,
        }}>
        <Animated.View
          style={{
            opacity: fadeAnim2,
          }}>
          <Image
            source={parliamoImg}
            style={{
              width: '100%',
              objectFit: 'fill',
              height: 200,
            }}
          />
        </Animated.View>

        <Animated.View
          style={{
            transform: [{translateY: slideAnim}],
            opacity: fadeAnim3,
          }}>
          <View
            style={{
              alignItems: 'center',
              top: -33.45454406738281,
            }}
            onLayout={e => {}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: '600',
                color: lightblue[600],
                letterSpacing: 2,
              }}>
              Welcome :)
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          style={{
            transform: [{translateX: slideAnim2}],
          }}>
          <View
            style={[
              styles.containerTextInput,
              {left: -Dimensions.get('screen').width},
            ]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={styles.textInput}
              onChangeText={e => handleChange(e, 'email')}
              autoCapitalize="none"
            />
          </View>
        </Animated.View>

        <Animated.View
          style={{
            transform: [{translateX: slideAnim3}],
          }}>
          <View
            style={[
              styles.containerTextInput,
              {left: -Dimensions.get('screen').width},
            ]}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={e => handleChange(e, 'password')}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={{
            transform: [{translateX: slideAnim4}],
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              alignItems: 'flex-end',
              right: -200,
            }}>
            <Text
              style={{
                color: lightblue[500],
                fontWeight: '500',
                fontSize: 15,
              }}>
              Forgot password
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.View
        style={{
          width: '50%',
          bottom: slideAnim5,
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            backgroundColor: lightblue[400],
            alignItems: 'center',
            borderRadius: 5,
            padding: 10,
            // bottom: -200,
          }}
          onPress={() => {
            handleLogin();
          }}>
          <Text
            style={{
              color: lightblue[100],
              fontWeight: '500',
              fontSize: 18,
              letterSpacing: 1,
            }}>
            Login
          </Text>
        </TouchableOpacity>
        {/* </Animated.View> */}

        <Text
          style={{
            fontSize: 20,
            color: lightblue[400],
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Or
        </Text>

        {/* <Animated.View
        style={{
          width: '50%',
          transform: [{translateY: slideAnim5}],
        }}> */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            backgroundColor: lightblue[400],
            alignItems: 'center',
            borderRadius: 5,
            padding: 10,
            // bottom: -200,
          }}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text
            style={{
              color: lightblue[100],
              fontWeight: '500',
              fontSize: 18,
              letterSpacing: 1,
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <Animated.View
          style={{
            // width: '50%',
            alignItems: 'flex-end',
            left: slideAnim6,
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              left: -Dimensions.get('screen').width / 2,
            }}>
            <Icon size={30} name="facebook" color={lightblue[400]} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            // width: '50%',
            alignItems: 'flex-start',
            right: slideAnim7,
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              right: -Dimensions.get('screen').width / 2,
            }}>
            <Icon size={30} name="google" color={lightblue[400]} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: '500',
    color: lightblue[500],
  },
  textInput: {
    borderColor: lightblue[500],
    borderBottomWidth: 2,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 10,
    color: lightblue[500],
    fontWeight: '500',
    fontSize: 19,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightblue[100],
  },
  containerTextInput: {
    marginVertical: 5,
  },
});

const GetReady = () => {
  // const isFocused = useIsFocused();

  const [focus, setFocus] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getData({key: keystorage.login}).then(res => {
        if (res) {
          navigation.navigate('ListChat');
        }
      });
      setFocus(true);

      return () => setFocus(false);
    }, [focus]),
  );

  if (focus) {
    return <Login />;
  } else {
    return <Text>Loading . . </Text>;
  }
};

export default GetReady;
