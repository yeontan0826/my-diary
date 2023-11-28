import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigation } from './navigations/rootStackNavigation';
import { useState } from 'react';
import { SplashView } from './splashView';

export const RootApp = () => {
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    return <SplashView onFinishLoad={() => setInitialized(true)} />;
  }

  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};
