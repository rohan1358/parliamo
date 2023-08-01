/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './redux/rootReducer'; // Ubah sesuai dengan path ke root reducer Anda

const store = createStore(rootReducer); // Buat store dengan root reducer

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
