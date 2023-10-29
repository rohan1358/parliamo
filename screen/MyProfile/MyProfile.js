import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {lightblue, yellow} from '../../assets/color/color';
import {imageDummy1} from '../../assets/image/imageDummy';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {getData, keystorage} from '../../storage';
import ModalEdit from './ModalEdit';

const MyProfile = () => {
  const [dataLogin, setDataLogin] = useState({});

  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideAnim2 = useRef(new Animated.Value(0)).current;
  const slideAnim3 = useRef(new Animated.Value(0)).current;

  const slideAnim4 = useRef(new Animated.Value(0)).current;

  const [showListSettings, setShowListSettings] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalAboutVisible, setModalAboutVisible] = useState(false);
  const [modalEmailVisible, setModalEmailVisible] = useState(false);

  let [listSettings, setListSettings] = useState([
    {
      title: 'Name',
      icon: 'account',
      label: dataLogin.name || 'Name User',
      description: 'This is Your Name!!',
      id: Math.random(),
      clickEdit: () => setModalVisible(true),
    },
    {
      title: 'About',
      icon: 'information-outline',
      label: dataLogin.about || 'Hey there! I am using Parliamo',
      description: '-',
      id: Math.random(),
      clickEdit: () => setModalAboutVisible(true),
    },
    {
      title: 'Email',
      icon: 'email',
      label: '+62 855-2453-1474',
      description: '-',
      id: Math.random(),
      clickEdit: () => setModalEmailVisible(true),
    },
  ]);

  useEffect(() => {
    const getDataLogin = async () => {
      await getData({key: keystorage.login}).then(res => {
        listSettings[0] = {...listSettings[0], label: res.name};
        listSettings[1] = {...listSettings[1], label: res.about};
        listSettings[2] = {...listSettings[2], label: res.email};
        setListSettings(listSettings);
        setDataLogin(res);
      });
    };
    getDataLogin();
  }, [modalVisible, modalAboutVisible, modalEmailVisible]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // setShowListSettings(true);
    });

    Animated.timing(slideAnim4, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // setShowListSettings(true);
    });

    Animated.timing(slideAnim2, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // setShowListSettings(true);
    });

    Animated.timing(slideAnim3, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {});
  }, [fadeAnim, slideAnim]);

  const [animation] = useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false, // 'false' for layout animations
    }).start(() => {
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {});
    });
    Animated.timing(fadeAnim, {
      toValue: Dimensions.get('screen').width / 5,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setShowListSettings(true);
    });
  };

  const interpolatedScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 200],
  });

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <>
      <ModalEdit
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dataLogin={dataLogin}
        keys="name"
      />

      <ModalEdit
        modalVisible={modalAboutVisible}
        setModalVisible={setModalAboutVisible}
        dataLogin={dataLogin}
        keys="about"
      />
      <ModalEdit
        modalVisible={modalEmailVisible}
        setModalVisible={setModalEmailVisible}
        dataLogin={dataLogin}
        keys="email"
      />
      <View
        onTouchStart={() => {
          if (modalVisible) {
            setModalVisible(false);
          }
        }}
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
            <View
              style={{
                left: -100,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name="arrow-left" size={25} color={lightblue[100]} />
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View
            style={{
              top: slideAnim2,
              flex: 1,
            }}>
            <View
              style={{
                top: -100,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: lightblue[100],
                }}>
                Profile
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={{
              right: slideAnim3,
            }}>
            <View
              style={{
                right: -100,
              }}>
              <Icon name="magnify" size={25} color={lightblue[100]} />
            </View>
          </Animated.View>
        </View>
        <Animated.View
          style={{
            left: fadeAnim,
            paddingHorizontal: 5,
            marginVertical: 5,
          }}>
          <View
            style={{
              // flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              left: -Dimensions.get('screen').width / 5,
              position: 'relative',
            }}>
            <Animated.Image
              source={{uri: imageDummy1}}
              style={{
                width: interpolatedScale,
                height: interpolatedScale,
                borderRadius: 100,
              }}
            />

            <Animated.View
              style={{
                top: -50,
                backgroundColor: lightblue[400],
                left: '15%',
                borderRadius: 50,
                borderWidth: 3,
                padding: 10,
                borderColor: lightblue[50],
                opacity: fadeAnim2,
              }}>
              <TouchableOpacity
                style={{
                  alignContent: 'flex-end',
                  justifyContent: 'flex-end',
                  // position: 'absolute',
                  // top: 100,
                  // marginTop: 100,
                }}>
                <Icon name="camera" size={30} color={lightblue[50]} />
              </TouchableOpacity>
            </Animated.View>

            {/* </Animated.View> */}
            {/* <View
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
            <TouchableOpacity style={{}}>
              <Icon name="qrcode" size={40} color={lightblue[200]} />
            </TouchableOpacity>
          </View> */}
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
                  delay={index * 500}
                  title={data.title}
                  clickEdit={data.clickEdit}
                />
              );
            })}
          </>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

const ListSettingsComponent = ({
  label,
  description,
  icon,
  id,
  delay,
  title,
  clickEdit,
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
    <View
      key={id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
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
          flex: 1,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            right: -Dimensions.get('screen').width,
          }}>
          <Text
            style={{
              color: lightblue[200],
            }}>
            {title}
          </Text>
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
      <Animated.View
        style={{
          right: slideAnim,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
            right: -Dimensions.get('screen').width,
            // flex: 1,
          }}>
          <TouchableOpacity onPress={() => clickEdit && clickEdit()}>
            <Icon name={'pencil'} color={lightblue[50]} size={20} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default MyProfile;
