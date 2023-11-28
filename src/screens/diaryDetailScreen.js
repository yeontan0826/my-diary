import { useCallback, useMemo } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

import { Header } from '../components/header/header';
import { Spacer } from '../components/spacer';
import { RemoteImage } from '../components/remoteImage';
import { Typography } from '../components/typography';

export const DiaryDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { width } = useWindowDimensions();

  const photoSize = useMemo(() => {
    return {
      photoWidth: width,
      photoHeight: width * 0.5,
    };
  }, [width]);

  const date = useMemo(() => {
    return new Date(route.params.item.date);
  }, [route.params.item.date]);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon name="arrow-back" onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title title="DIARY DETAIL" />
        </Header.Group>
      </Header>
      <ScrollView style={{ flex: 1 }}>
        {typeof route.params.item.photoUrl !== 'undefined' && (
          <RemoteImage
            url={route.params.item.photoUrl}
            width={photoSize.photoWidth}
            height={photoSize.photoHeight}
          />
        )}
        <Spacer space={20} />
        <Container>
          <Typography fontSize={20}>날짜</Typography>
          <Typography fontSize={16}>{`${date.getFullYear()}-${
            date.getMonth() + 1
          }-${date.getDate()}`}</Typography>
        </Container>
        <Spacer space={40} />
        <View style={{ paddingHorizontal: 24 }}>
          <Typography fontSize={32}>{route.params.item.title}</Typography>
          <Typography fontSize={24}>{route.params.item.content}</Typography>
        </View>
      </ScrollView>
    </View>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
`;
