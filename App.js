import React, {useEffect} from 'react';
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
// import VideoCall from './screen/VideoCall/VideoCall';
import NewVideoCall from './screen/NewVIdeoCall/NewVideoCall';
import MainRegister from './screen/Register/Register';
import MainListParliamoUser from './screen/ListParliamoUser/ListParliamoUser';
import {Dimensions} from 'react-native';
import {responsiveFontSize} from './utils';
// import VideCall2 from './screen/VideoCall/VideoCall2';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {}, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
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
          name="Register"
          component={MainRegister}
          options={{title: 'Register'}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Settings'}}
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
        <Stack.Screen
          name="VideCall"
          component={NewVideoCall}
          options={{title: 'VideoCall', animationEnabled: false}}
        />
        <Stack.Screen
          name="ListParliamoUser"
          component={MainListParliamoUser}
          options={{title: 'ListParliamoUser', animationEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
