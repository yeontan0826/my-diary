import { ActivityIndicator, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import styled from 'styled-components/native';

import { userInfoState } from './recoil/states/userInfo';
import { useGetDiaryList } from './hooks/useGetDiaryList';
import { PasswordInputBox } from './components/passwordInputBox';

export const SplashView = (props) => {
  const runGetDiaryList = useGetDiaryList();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loading, setLoading] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  const signinUserIdentify = useCallback(async (idToken) => {
    setLoading(true);
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const result = await auth().signInWithCredential(googleCredential);

    const userDBRefKey = `/users/${result.user.uid}`;
    const userResult = await database()
      .ref(userDBRefKey)
      .once('value')
      .then((snapshot) => snapshot.val());

    const now = new Date().toISOString();

    if (userResult === null) {
      await database().ref(userDBRefKey).set({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
        uid: result.user.uid,
        password: '',
        createdAt: now,
        lastLoginAt: now,
      });
    }

    const userInfo = await database()
      .ref(userDBRefKey)
      .once('value')
      .then((snapshot) => snapshot.val());

    setUserInfo(userInfo);

    await runGetDiaryList(userInfo);

    if (userInfo.password !== '') {
      setShowPasswordInput(true);
      setLoading(false);
      return;
    }

    await database().ref(userDBRefKey).update({
      lastLoginAt: now,
    });

    props.onFinishLoad();
  }, []);

  const onPresGoogleLogin = useCallback(async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    signinUserIdentify(idToken);
  }, []);

  const userSilentLogin = useCallback(async () => {
    try {
      setLoading(true);
      const { idToken } = await GoogleSignin.signInSilently();
      signinUserIdentify(idToken);
    } catch (error) {
      setShowLoginButton(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    userSilentLogin();
  }, []);

  return (
    <Container>
      {showLoginButton && <GoogleSigninButton onPress={onPresGoogleLogin} />}
      {showPasswordInput && (
        <PasswordInputBox
          value={inputPassword}
          onChangeText={async (text) => {
            setInputPassword(text);
            if (text.length === 4) {
              if (userInfo.password === text) {
                const now = new Date().toISOString();
                const userDB = `/users/${userInfo.uid}`;

                await database().ref(userDB).update({
                  lastLoginAt: now,
                });

                props.onFinishLoad();
              } else {
                setInputPassword('');
                setPasswordError('비밀번호가 다릅니다.');
              }
            }
          }}
          errorMessage={passwordError}
        />
      )}
      {loading && <ActivityIndicator />}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
