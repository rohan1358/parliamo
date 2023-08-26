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
} from 'react-native';

import OutlineButton from '../../component/OutlineButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {makeId} from '../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {blue, lightblue} from '../../assets/color/color';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'lskdjf',
    title: '4 Item',
  },
  {
    id: 'slkdjf',
    title: '5 Item',
  },
];

const data = [
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),
    user: 'user 2',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
  {
    id: makeId(5),
    newMessage: true,
    user: `ucok ${makeId(2)}`,
    message: makeId(20),
    time: '12.14',
  },
  {
    id: makeId(5),

    user: 'user 3',
    message: makeId(10),
    time: '12.13',
    you: true,
    slideDuration: 1001,
  },
];

const ListChat = () => {
  const navigation = useNavigation();

  const [searchComp, setSearchComp] = useState(false);
  const [sideBarComponent, setSideBarComponent] = useState(false);

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
            Parliamo
          </Text>
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
          data={data}
          renderItem={({item, index}) => {
            return (
              <OutlineButton
                newMessage={item.newMessage}
                user={item.user}
                message={item.message}
                time={item.time}
                slideDuration={index * 500}
                key={item.id}
                you={item.you}
                onPress={() => {
                  navigation.navigate('ChatRoom');
                }}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
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
        <TouchableOpacity onPress={() => closeComponent()}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Menu 1
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

const ListChatScreen = () => {
  const focus = useIsFocused();
  if (focus) {
    return <ListChat />;
  } else {
    return <></>;
  }
};

export default ListChatScreen;
