import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RecoilRoot } from 'recoil';

import { RootApp } from './src/rootApp';

GoogleSignin.configure();

export default function App() {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <RootApp />
      </SafeAreaProvider>
    </RecoilRoot>
  );
}
