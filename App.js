import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './ChatScreen';
import ListChat from './screen/ListChat/ListChat';
import ChatRoom from './screen/ChatRoom/ChatRoom';
import Profile from './screen/profile/Profile';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{title: 'Chatting Room'}}
        />
        <Stack.Screen
          name="ListChat"
          component={ListChat}
          options={{title: 'List Chat'}}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={{title: 'Chat Room', headerMode: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile', headerMode: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
