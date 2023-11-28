import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import database from '@react-native-firebase/database';

import { diaryListState } from '../recoil/states/diaryList';

export const useGetDiaryList = () => {
  const setDiaryList = useSetRecoilState(diaryListState);

  return useCallback(async (userInfo) => {
    const userDiaryDB = database().ref(`diary/${userInfo.uid}`);

    const diaryListResult = await userDiaryDB
      .once('value')
      .then((snapshot) => snapshot.val());

    if (diaryListResult === null) return [];

    const list = Object.keys(diaryListResult).map(
      (key) => diaryListResult[key]
    );

    setDiaryList(list);
  }, []);
};
