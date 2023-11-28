import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DiaryListScreen } from '../screens/diaryListScreen';
import { DiaryDetailScreen } from '../screens/diaryDetailScreen.js';
import { SettingScreen } from '../screens/settingScreen';
import { AddPasswordScreen } from '../screens/addPasswordScreen.js';

const Stack = createNativeStackNavigator();

export const DiaryStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="DiaryListScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DiaryListScreen" component={DiaryListScreen} />
      <Stack.Screen name="DiaryDetailScreen" component={DiaryDetailScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="AddPasswordScreen" component={AddPasswordScreen} />
    </Stack.Navigator>
  );
};
