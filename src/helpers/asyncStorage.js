import AsyncStorage from '@react-native-async-storage/async-storage'

export const getStoreData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey)
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log('Async Storage Reading Error:', e)

    throw e
  }
}

export const setStoreData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(storageKey, jsonValue)
  } catch (e) {
    console.log('Async Storage Saving Error:', e)

    throw e
  }
}