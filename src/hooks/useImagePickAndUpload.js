import { useCallback } from 'react';
import { Platform } from 'react-native';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export const useImagePickAndUpload = (allowsEditing) => {
  return useCallback(async () => {
    const imagePickResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing,
    });

    if (imagePickResult.canceled) return;

    const pickPhotoResultArray = imagePickResult.assets.map((item) => {
      const uri = item.uri;
      const fileNameArray = uri.split('/');
      const fileName = fileNameArray[fileNameArray.length - 1];

      return {
        uri,
        fileName,
      };
    });

    const putResultList = await Promise.all(
      pickPhotoResultArray.map(async (item) => {
        const result = await storage()
          .ref(item.fileName)
          .putFile(
            Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.uri
          );
        return await storage().ref(result.metadata.fullPath).getDownloadURL();
      })
    );

    return putResultList;
  }, []);
};
