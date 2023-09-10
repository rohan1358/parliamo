const {
  default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');

const storeData = async ({key = 'my-key', value}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    return e;
    // saving error
  }
};

const getData = async ({key = 'my-key'}) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return e;
    // error reading value
  }
};

const removeData = async ({key}) => {
  try {
    const jsonValue = await AsyncStorage.removeItem(key);
    return 'success remove';
  } catch (e) {
    return e;
    // error reading value
  }
};

const keystorage = {
  login: 'login',
};

export {storeData, getData, keystorage, removeData};
