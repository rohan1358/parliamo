import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import OutlineButton from '../../component/OutlineButton';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {makeId} from '../../utils';

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <OutlineButton
              newMessage={item.newMessage}
              user={item.user}
              message={item.message}
              time={item.time}
              slideDuration={1000 + (index > 10 ? 10 : index) * 300}
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

export default ListChat;
