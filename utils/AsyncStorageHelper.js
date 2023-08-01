import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageHelper {

  set = async (key, _model) => {
    try {
      AsyncStorage.setItem(key, JSON.stringify(_model));
    } catch (error) {
      console.log("error", error)
    }
  }


  get = async (key) => {
    try {
      let t = await AsyncStorage.getItem(key);
      if (t) {
        return JSON.parse(t);
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  clear = async () => {
    try {
      return AsyncStorage.clear();;
    } catch (error) {
      console.log("error", error)
    }
  }

}


export default AsyncStorageHelper;