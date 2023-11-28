import { useCallback, useMemo, useState } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styled from 'styled-components/native';

import { Header } from '../components/header/header';
import { useImagePickAndUpload } from '../hooks/useImagePickAndUpload';
import { Button } from '../components/button';
import { RemoteImage } from '../components/remoteImage';
import { Spacer } from '../components/spacer';
import { Typography } from '../components/typography';
import { SingleLineInput } from '../components/singleLineInput';
import { MultiLineInput } from '../components/multiLineInput';
import { useCreateDiary } from '../hooks/useCreateDiary';

export const AddDiaryScreen = () => {
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const runImagePickAndUpload = useImagePickAndUpload(false);
  const runCreateDiary = useCreateDiary();

  const photoSize = useMemo(() => {
    return {
      photoWidth: width,
      photoHeight: width * 0.5,
    };
  }, [width]);

  const canSave = useMemo(() => {
    if (selectedDate === null) return false;
    if (title === '') return false;
    if (content === '') return false;

    return true;
  }, [selectedDate, title, content]);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressPhotoItem = useCallback(async () => {
    const result = await runImagePickAndUpload();
    if (result.length > 0) {
      setSelectedPhotoUrl(result[0]);
    }
  }, []);

  const onPressCalendar = useCallback(() => {
    setVisibleDatePicker(true);
  }, []);

  const onPressSave = useCallback(async () => {
    if (!canSave) return;

    await runCreateDiary(selectedPhotoUrl, selectedDate, title, content);

    navigation.goBack();
  }, [canSave, selectedPhotoUrl, selectedDate, title, content]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="ADD DIARY" />
        </Header.Group>
        <Header.Icon name="close" onPress={onPressBack} />
      </Header>
      <ScrollView style={{ flex: 1 }}>
        <Button onPress={onPressPhotoItem}>
          {selectedPhotoUrl !== null ? (
            <RemoteImage
              url={selectedPhotoUrl}
              width={photoSize.photoWidth}
              height={photoSize.photoHeight}
            />
          ) : (
            <ImageBackground
              width={photoSize.width}
              height={photoSize.photoHeight}
            />
          )}
        </Button>
        <Spacer space={20} />
        <Button onPress={onPressCalendar}>
          <CalendarContainer>
            <Typography fontSize={20}>날짜</Typography>
            <Typography fontSize={16}>
              {selectedDate === null
                ? '날짜를 선택해주세요'
                : `${selectedDate.getFullYear()}-${
                    selectedDate.getMonth() + 1
                  }-${selectedDate.getDate()}`}
            </Typography>
          </CalendarContainer>
        </Button>
        <Spacer space={40} />
        <View style={{ paddingHorizontal: 24 }}>
          <SingleLineInput
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력해주세요"
          />
        </View>
        <Spacer space={20} />
        <View style={{ paddingHorizontal: 24 }}>
          <MultiLineInput
            value={content}
            onChangeText={setContent}
            placeholder="있었던 일을 알려주세요"
          />
        </View>
        <Spacer space={40} />
        <View style={{ paddingHorizontal: 24 }}>
          <Button onPress={onPressSave}>
            <SaveButtonWrapper canSave={canSave}>
              <Typography color={canSave ? 'white' : 'gray'} fontSize={20}>
                등록하기
              </Typography>
            </SaveButtonWrapper>
          </Button>
        </View>
      </ScrollView>
      <DateTimePicker
        isVisible={visibleDatePicker}
        mode="date"
        onConfirm={(date) => {
          setSelectedDate(new Date(date));
          setVisibleDatePicker(false);
        }}
        onCancel={() => setVisibleDatePicker(false)}
      />
    </View>
  );
};

const ImageBackground = styled.View`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: lightgray;
`;

const CalendarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
`;

const SaveButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 4px;
  background-color: ${(props) => (props.canSave ? 'black' : 'lightgray')};
`;
