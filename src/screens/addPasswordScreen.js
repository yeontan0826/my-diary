import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import database from '@react-native-firebase/database';

import { Header } from '../components/header/header';
import { Spacer } from '../components/spacer';
import { PasswordInputBox } from '../components/passwordInputBox';
import { userInfoState } from '../recoil/states/userInfo';

export const AddPasswordScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [isInputFirst, setIsInputFirst] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onCompleteInputPassword = useCallback(async () => {
    if (firstInput !== secondInput) {
      return;
    }

    const userDB = `/users/${userInfo.uid}`;

    await database().ref(userDB).update({
      password: firstInput,
    });

    setUserInfo((prevState) => {
      return { ...prevState, password: firstInput };
    });

    navigation.goBack();
  }, [firstInput, secondInput, userInfo]);

  useEffect(() => {
    if (firstInput.length < 4) return;
    if (secondInput.length < 4) return;
    if (firstInput === secondInput) {
      // 저장하기
      onCompleteInputPassword();
    } else {
      setErrorMessage('비밀번호가 다릅니다');
      setSecondInput('');
    }
  }, [firstInput, secondInput]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon name="arrow-back" onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title
            title={`비밀번호 ${userInfo.password ? '수정' : '추가'}`}
          />
        </Header.Group>
      </Header>
      <View style={{ flex: 1, paddingTop: 32 }}>
        <PasswordInputBox
          value={isInputFirst ? firstInput : secondInput}
          onChangeText={(text) => {
            if (isInputFirst) {
              setFirstInput(text);

              if (text.length === 4) {
                setIsInputFirst(false);
              }
            } else {
              setSecondInput(text);
            }
          }}
          errorMessage={errorMessage}
        />
      </View>
    </View>
  );
};
