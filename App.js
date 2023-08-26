import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './ChatScreen';
import ListChat from './screen/ListChat/ListChat';
import ChatRoom from './screen/ChatRoom/ChatRoom';
import Profile from './screen/profile/Profile';
import Login from './screen/login/Login';
import Settings from './screen/Settings/Settings';
import MyProfile from './screen/MyProfile/MyProfile';
import QrCode from './screen/QrCode/QrCode';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="QrCode"
        screenOptions={{headerShown: false}}>
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
          options={{title: 'Chat Room'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{title: 'My Profile', animationEnabled: false}}
        />
        <Stack.Screen
          name="QrCode"
          component={QrCode}
          options={{title: 'QrCode', animationEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
