import { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import database from '@react-native-firebase/database';
import styled from 'styled-components/native';

import { Header } from '../components/header/header';
import { Spacer } from '../components/spacer';
import { userInfoState } from '../recoil/states/userInfo';
import { Button } from '../components/button';
import { RemoteImage } from '../components/remoteImage';
import { Typography } from '../components/typography';
import { useImagePickAndUpload } from '../hooks/useImagePickAndUpload';
import { Divider } from '../components/divider';
import { Icon } from '../components/icon';

export const SettingScreen = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const runImagePickAndUpload = useImagePickAndUpload(false);
  const navigation = useNavigation();

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressProfile = useCallback(async () => {
    const result = await runImagePickAndUpload();
    if (result.length >= 1) {
      const userDB = `/users/${userInfo.uid}`;
      // 프로필 이미지로 선택한 것이 업로드가 됨.
      setUserInfo((prevState) => {
        return {
          ...prevState,
          profileImage: result[0],
        };
      });

      await database().ref(userDB).update({
        profileImage: result[0],
      });
    }
  }, [userInfo, runImagePickAndUpload]);

  const onPressAddPassword = useCallback(() => {
    navigation.navigate('AddPasswordScreen');
  }, []);

  const onPressResetPassword = useCallback(async () => {
    const userDB = `/users/${userInfo.uid}`;
    database().ref(userDB).update({
      password: '',
    });
    setUserInfo((prevState) => {
      return {
        ...prevState,
        password: '',
      };
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon name="arrow-back" onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title title="SETTING" />
        </Header.Group>
      </Header>
      <Container>
        <ProfileContainer>
          <Button onPress={onPressProfile}>
            <RemoteImage
              url={userInfo.profileImage}
              width={100}
              height={100}
              style={{ borderRadius: 50 }}
            />
          </Button>
          <Spacer space={20} />
          <Typography fontSize={20}>{userInfo.name}</Typography>
        </ProfileContainer>
        <Spacer space={20} />
        <Divider />
        <Divider space={20} />
        <Button onPress={onPressAddPassword}>
          <OptionContainer>
            <Typography fontSize={16}>
              비밀번호 {userInfo.password ? '수정' : '추가'}
            </Typography>
            <Icon name="chevron-forward-outline" size={16} />
          </OptionContainer>
        </Button>
        {userInfo.password !== '' && (
          <Button onPress={onPressResetPassword}>
            <OptionContainer>
              <Typography fontSize={16}>비밀번호 초기화</Typography>
            </OptionContainer>
          </Button>
        )}
      </Container>
    </View>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 32px;
`;

const ProfileContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const OptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
`;
