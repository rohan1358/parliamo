import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  Image,
} from 'react-native';

import OutlineButton from '../../component/OutlineButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {makeId} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {blue, lightblue} from '../../assets/color/color';
import {imageDummy1} from '../../assets/image/imageDummy';
import {db} from '../VideoCall/utilities/firebase';
import {getData, keystorage} from '../../storage';

const ListChat = () => {
  const navigation = useNavigation();

  const [searchComp, setSearchComp] = useState(false);
  const [sideBarComponent, setSideBarComponent] = useState(false);

  const [stateListParliamoUser, setStateListParliamoUser] = useState([]);

  const getListUserParliamo = async () => {
    let dataLogin = await getData({key: keystorage.login});
    db.collection('users')
      .where('email', '!=', dataLogin.email)
      .get()
      .then(res => {
        setStateListParliamoUser(res.docs);
      });
  };

  useState(() => {
    getListUserParliamo();
  }, []);

  return (
    <>
      {searchComp ? <SearchComponent setClose={setSearchComp} /> : <></>}
      {sideBarComponent ? (
        <SideBarComponent
          setClose={setSideBarComponent}
          navigation={navigation}
        />
      ) : (
        <></>
      )}
      <SafeAreaView
        style={styles.container}
        onTouchStart={() => {
          if (sideBarComponent) {
            setSideBarComponent(false);
          }
          if (searchComp) {
            setSearchComp(false);
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: lightblue[900],
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 25,
              letterSpacing: 5,
              fontWeight: 'bold',
              flex: 1,
              color: lightblue[100],
            }}>
            Parliamo User
          </Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Icon name="account-multiple" size={30} color={lightblue[100]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSearchComp(true);
            }}>
            <Icon name="magnify" size={30} color={lightblue[100]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSideBarComponent(true);
            }}>
            <Icon name="dots-vertical" size={30} color={lightblue[100]} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={stateListParliamoUser}
          renderItem={({item, index}) => (
            <ListUserParliamo
              name={item.data().name}
              navigation={navigation}
              item={item}
            />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  );
};

const ListUserParliamo = ({name, item, navigation}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          position: 'relative',
          borderRadius: 20,
          backgroundColor: lightblue[200],
          shadowColor: lightblue[800],
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 3.05,
          elevation: 4,
          marginVertical: 2,
        }}>
        {/* background start */}
        <View
          style={{
            width: 50,
            height: '80%',
            position: 'absolute',
            left: 0,
            backgroundColor: lightblue[400],
            bottom: 0,
            borderTopRightRadius: 50,
            borderRadius: 20,
          }}
        />
        <View
          style={{
            width: 50,
            height: '80%',
            position: 'absolute',
            top: 0,
            backgroundColor: lightblue[400],
            right: 0,
            borderBottomLeftRadius: 50,
            borderRadius: 20,
          }}
        />
        {/* background end */}

        <View>
          <Image
            source={{
              uri: imageDummy1,
            }}
            height={50}
            width={50}
            borderRadius={50}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
            }}>
            Web Developer
          </Text>
        </View>
        <View>
          <TouchableOpacity>
            <Icon
              name="account-multiple-plus"
              size={30}
              color={lightblue[900]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChatRoom', {
                id: item.id,
              })
            }>
            <Icon name="message-arrow-right" size={30} color={lightblue[900]} />
          </TouchableOpacity>
          {/* <Icon
              name="account-multiple-minus"
              size={30}
              color={lightblue[900]}
            />
            <Icon
              name="account-multiple-check"
              size={30}
              color={lightblue[900]}
            /> */}
        </View>
      </View>
    </View>
  );
};

const SearchComponent = ({setClose}) => {
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
const SideBarComponent = ({setClose, navigation}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('screen').width,
      duration: 500,
      useNativeDriver: false,
    }).start(cb => {});
  }, [slideAnim]);

  const closeComponent = () => {
    Animated.timing(slideAnim, {
      toValue: -Dimensions.get('screen').width,
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
        right: slideAnim,
        position: 'absolute',
        zIndex: 2,
      }}>
      <View
        style={{
          backgroundColor: lightblue[400],
          right: -Dimensions.get('screen').width,
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: blue[500],
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
            // closeComponent()
          }}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
  },
});

const MainListParliamoUser = () => {
  const focus = useIsFocused();
  if (focus) {
    return <ListChat />;
  } else {
    return <></>;
  }
};

export default MainListParliamoUser;
