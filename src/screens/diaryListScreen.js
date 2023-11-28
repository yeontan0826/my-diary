import { useCallback } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Header } from '../components/header/header';
import { Button } from '../components/button';
import { Icon } from '../components/icon';
import { RemoteImage } from '../components/remoteImage';
import { Spacer } from '../components/spacer';
import { Typography } from '../components/typography';
import { diaryListState } from '../recoil/states/diaryList';

export const DiaryListScreen = () => {
  const data = useRecoilValue(diaryListState);

  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const onPressSettings = useCallback(() => {
    navigation.navigate('SettingScreen');
  }, []);

  const onPressAdd = useCallback(() => {
    navigation.navigate('AddDiaryScreen');
  }, []);

  const renderItem = ({ item }) => {
    const date = new Date(item.updatedAt);

    return (
      <Button
        onPress={() => {
          navigation.navigate('DiaryDetailScreen', { item });
        }}
      >
        <View style={{ paddingVertical: 12 }}>
          {typeof item.photoUrl !== 'undefined' && item.photoUrl !== null && (
            <>
              <RemoteImage
                url={item.photoUrl}
                width={width - 24 * 2}
                height={(width - 24 * 2) * 0.5}
                style={{ borderRadius: 8 }}
              />
              <Spacer space={4} />
            </>
          )}
          <ItemContainer>
            <View>
              <Typography fontSize={18}>{item.title}</Typography>
              <Spacer space={4} />
              <Typography fontSize={12}>{item.content}</Typography>
            </View>
            <Typography fontSize={12}>{`${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`}</Typography>
          </ItemContainer>
        </View>
      </Button>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header>
          <Header.Group>
            <Header.Title title="DIARY LIST" />
          </Header.Group>
          <Header.Icon name="settings" onPress={onPressSettings} />
        </Header>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 32 }}
          data={data}
          renderItem={renderItem}
        />
      </View>
      <FloatingButtonWrapper safeAreaInsets={safeAreaInsets}>
        <Button onPress={onPressAdd}>
          <FloatingButtonContainer>
            <Icon name="add" color="white" size={30} />
          </FloatingButtonContainer>
        </Button>
      </FloatingButtonWrapper>
    </View>
  );
};

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const FloatingButtonWrapper = styled.View`
  position: absolute;
  right: 12px;
  bottom: ${(props) => 24 + props.safeAreaInsets.bottom}px;
`;

const FloatingButtonContainer = styled.View`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: black;
`;
