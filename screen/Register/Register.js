import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {lightblue, yellow} from '../../assets/color/color';

import parliamoImg from '../../assets/image/parliamo.png';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {db} from '../VideoCall/utilities/firebase';
import {getData, keystorage, storeData} from '../../storage';
import BackroundBubble from '../../component/BackgroundBubble';
import ModalFailedRegister from './ModalFailedRegister';

const textParliamo = ['P', 'A', 'R', 'L', 'I', 'A', 'M', 'O'];

const {height, width} = Dimensions.get('window');
// const =  Dimensions.get('window').height

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Register = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);

  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [fieldEmailInvalid, setFieldEmailInvalid] = useState(false);
  const [fieldPasswordInvalid, setFieldPasswordInvalid] = useState(false);
  const [fieldNameInvalid, setFieldNameInvalid] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideAnim2 = useRef(new Animated.Value(0)).current;
  const slideAnim3 = useRef(new Animated.Value(0)).current;
  const slideAnim4 = useRef(new Animated.Value(0)).current;
  const slideAnim5 = useRef(new Animated.Value(0)).current;
  const slideAnim6 = useRef(new Animated.Value(0)).current;
  const slideAnim7 = useRef(new Animated.Value(0)).current;

  const nameFieldAnim = useRef(new Animated.Value(0)).current;

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
                Animated.timing(nameFieldAnim, {
                  toValue: Dimensions.get('screen').width,
                  duration: 500,
                  useNativeDriver: false,
                }).start(() => {
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
                          toValue: -200,
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
          });
        }
      };
    }
  }, [currentIndex, textParliamo, fadeAnim, slideAnim, fadeAnim2]);

  const handleChangeText = ({value = '', name = ''}) => {
    if (name) {
      setFieldNameInvalid(false);
    }
    if (name) {
      setFieldEmailInvalid(false);
    }
    if (name) {
      setFieldPasswordInvalid(false);
    }
    setValue(stateValue => {
      return {...stateValue, [name]: value};
    });
  };

  const [modalRegisterFailed, setModalRegisterFailed] = useState(false);

  const onRegister = async ({values = value}) => {
    if (values.name === '') {
      setFieldNameInvalid(true);
      return;
    }
    if (values.email === '') {
      setFieldEmailInvalid(true);
      return;
    }
    if (values.password === '') {
      setFieldPasswordInvalid(true);
      return;
    }
    setDisableBtn(true);
    try {
      const checkuser = await db
        .collection('users')
        .where('email', '==', values.email)
        .get();

      if (checkuser.empty) {
        // .then(res => {
        //   if(res.empty){

        //   }
        //   res.docs.forEach(res => {
        //     console.log(res.data());
        //   });
        // })
        // .catch(err => {
        //   console.log('err', err);
        // });

        const docRef = db.collection('users');
        const setDoc = await docRef.add({
          name: values.name,
          email: values.email,
          password: values.password,
        });

        await storeData({
          key: keystorage.login,
          value: {
            name: values.name,
            email: values.email,
            password: values.password,
            id: setDoc.id,
          },
        });
        navigation.navigate('ListChat');
      } else {
        setModalRegisterFailed(true);
        setDisableBtn(false);
      }
    } catch (error) {
      setDisableBtn(false);
    }
  };

  useEffect(() => {}, []);

  const [modalReject, setModalReject] = useState(false);

  return (
    <View style={styles.container}>
      <ModalFailedRegister
        modalVisible={modalRegisterFailed}
        setModalVisible={setModalRegisterFailed}
      />
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
            transform: [{translateX: nameFieldAnim}],
          }}>
          <View
            style={[
              styles.containerTextInput,
              {left: -Dimensions.get('screen').width},
            ]}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={e => handleChangeText({value: e, name: 'name'})}
            />
            {fieldNameInvalid ? (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: yellow[500],
                }}>
                Masukan Nama anda!
              </Text>
            ) : (
              <></>
            )}
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
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.textInput}
              onChangeText={e => handleChangeText({value: e, name: 'email'})}
            />
            {fieldEmailInvalid ? (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: yellow[500],
                }}>
                Masukan Email anda!
              </Text>
            ) : (
              <></>
            )}
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
              onChangeText={e => handleChangeText({value: e, name: 'password'})}
            />
            {fieldPasswordInvalid ? (
              <Text
                style={{
                  fontWeight: 'bold',
                  color: yellow[500],
                }}>
                Masukan Passowrd anda!
              </Text>
            ) : (
              <></>
            )}
          </View>
        </Animated.View>
      </View>

      <Animated.View
        style={{
          width: '50%',
          transform: [{translateY: slideAnim5}],
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            backgroundColor: disableBtn ? lightblue[300] : lightblue[400],
            alignItems: 'center',
            borderRadius: 5,
            padding: 10,
            bottom: -200,
          }}
          disabled={disableBtn}
          onPress={() => {
            onRegister({values: value});
            // navigation.navigate('ListChat');
          }}>
          {!disableBtn ? (
            <Text
              style={{
                color: lightblue[100],
                fontWeight: '500',
                fontSize: 18,
                letterSpacing: 1,
              }}>
              Register
            </Text>
          ) : (
            <ActivityIndicator size="large" color={lightblue[100]} style={{}} />
          )}
        </TouchableOpacity>
      </Animated.View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <Animated.View
          style={{
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

      {/* <View
        style={{
          position: 'absolute',
          backgroundColor: lightblue[200],
          width: '80%',
          borderRadius: 10,
          shadowColor: lightblue[700],
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 3.05,
          elevation: 4,
          alignItems: 'center',
          padding: 20,
        }}>
        <Icon name="alert-circle" size={200} color={yellow[900]} />
        <Text
          style={{
            color: yellow[800],
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          email pernah digunakan, gunakan email yang belum pernah digunakan
        </Text>
      </View> */}
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

const MainRegister = () => {
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
    return <Register />;
  } else {
    return <Text>Loading . . </Text>;
  }
};

export default MainRegister;
