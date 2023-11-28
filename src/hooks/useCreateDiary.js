import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import database from '@react-native-firebase/database';

import { userInfoState } from '../recoil/states/userInfo';
import { diaryListState } from '../recoil/states/diaryList';

export const useCreateDiary = () => {
  const userInfo = useRecoilValue(userInfoState);
  const setDiaryList = useSetRecoilState(diaryListState);

  return useCallback(async (photoUrl, date, title, content) => {
    if (date === null) return;
    if (title === '') return;
    if (content === '') return;

    const now = new Date().toISOString();
    const userDiaryDB = database().ref(`diary/${userInfo.uid}`).push();
    const saveItem = {
      photoUrl,
      title,
      content,
      date: date.toISOString(),
      createdAt: now,
      updatedAt: now,
    };

    await userDiaryDB.set(saveItem);
    setDiaryList((prevList) => [saveItem, ...prevList]);
  }, []);
};
