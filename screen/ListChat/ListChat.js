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
import {makeId, responsiveFontSize} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {blue, lightblue, yellow} from '../../assets/color/color';
import LottieView from 'lottie-react-native';
import {imageDummy1} from '../../assets/image/imageDummy';
import Svg, {Path} from 'react-native-svg';
import {getData, keystorage} from '../../storage';
import {db} from '../VideoCall/utilities/firebase';
import BackroundBubble from '../../component/BackgroundBubble';
import SearchComponent from '../../component/SearchComponent';

const listChats = false;

const ListChat = () => {
  const navigation = useNavigation();

  const [searchComp, setSearchComp] = useState(false);
  const [sideBarComponent, setSideBarComponent] = useState(false);

  const [dataListChat, setDataListChat] = useState([]);
  const [allDataListChat, setAllDataListChat] = useState([]);

  const getListChat = async () => {
    let dataLogin = await getData({key: keystorage.login});
    db.doc(`listChat/${dataLogin.id}`).onSnapshot(snapshot => {
      if (snapshot.data()) {
        let array = Object.values(snapshot.data());
        setDataListChat(array);
        setAllDataListChat(array);
      }
    });
  };
  useEffect(() => {
    getListChat();
  }, []);

  const handleSearch = keyword => {
    if (keyword) {
      let results = allDataListChat.filter(data => data.name.includes(keyword));
      setDataListChat(results);
    } else {
      getListChat();
    }
  };

  return (
    <>
      {searchComp ? (
        <SearchComponent setClose={setSearchComp} onChangeText={handleSearch} />
      ) : (
        <></>
      )}
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
        <BackroundBubble />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: lightblue[900],
            paddingVertical: 10,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(25),
              letterSpacing: 5,
              fontWeight: 'bold',
              flex: 1,
              color: lightblue[100],
            }}>
            Parliamo
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate('ListParliamoUser');
            }}>
            <Icon name="account-multiple" size={30} color={lightblue[100]} />
          </TouchableOpacity>

          {/* search chat */}
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
        {dataListChat.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: lightblue[100],
            }}>
            <LottieView
              source={require('./lottie-empty.json')}
              autoPlay
              loop
              style={{
                height: 300,
                width: 300,
              }}
              speed={0.6}
            />
          </View>
        ) : (
          <FlatList
            data={dataListChat}
            renderItem={({item, index}) => {
              return (
                <OutlineButton
                  key={index}
                  id={item.idSender}
                  // newMessage={item.lastMessage}
                  // user={item.user}
                  message={item.lastMessage}
                  time={'10:20'}
                  // slideDuration={index * 500}
                  // key={item.id}
                  // you={item.you}
                  times={item.time}
                  onPress={() => {
                    navigation.navigate('ChatRoom', {
                      id: item.idSender,
                    });
                  }}
                />
              );
            }}
            keyExtractor={item => item.time.seconds}
          />
        )}
      </SafeAreaView>
    </>
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
              fontSize: responsiveFontSize(20),
            }}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text
            style={{
              fontSize: responsiveFontSize(20),
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
    fontSize: responsiveFontSize(16),
  },
});

const ListChatScreen = () => {
  const focus = useIsFocused();
  if (focus) {
    return <ListChat />;
  } else {
    return (
      <View>
        <Text>Loading . . . </Text>
      </View>
    );
  }
};

export default ListChatScreen;
