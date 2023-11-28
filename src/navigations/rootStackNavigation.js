import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DiaryStackNavigation } from './diaryStackNavigation';
import { AddDiaryScreen } from '../screens/addDiaryScreen';

const Stack = createNativeStackNavigator();

export const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="DiaryStackNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="DiaryStackNavigation"
        component={DiaryStackNavigation}
      />
      <Stack.Screen name="AddDiaryScreen" component={AddDiaryScreen} />
    </Stack.Navigator>
  );
};
