/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './redux/rootReducer'; // Ubah sesuai dengan path ke root reducer Anda
import notifee, {AndroidImportance} from '@notifee/react-native';

const store = createStore(rootReducer); // Buat store dengan root reducer

notifee.registerForegroundService(notification => {
  return new Promise(async () => {});
});

const notefeeeeeee = async () => {
  try {
    const channelId = await notifee.createChannel({
      id: 'screen_capture',
      name: 'Screen Capture',
      lights: false,
      vibration: false,
      importance: AndroidImportance.DEFAULT,
    });

    await notifee.displayNotification({
      title: 'Screen Capture',
      body: 'This notification will be here until you stop capturing.',
      android: {
        channelId,
        asForegroundService: true,
      },
    });
  } catch (err) {
    // Handle Error
  }
};

notefeeeeeee();
const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
