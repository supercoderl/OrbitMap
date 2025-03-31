import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AppNavigator from '@/routes';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useLoading } from '@/contexts/LoadingContext';
import { setLoadingFunctions } from '@/utils/loading';
import { Provider } from "react-redux";
import { persistor, store } from '@/redux';
import { PersistGate } from 'redux-persist/integration/react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
enableScreens();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    LexendRegular: require('../assets/fonts/Lexend-Regular.ttf'),
    LexendBold: require('../assets/fonts/Lexend-Bold.ttf'),
    LexendBlack: require('../assets/fonts/Lexend-Black.ttf'),
    LexendExtraBold: require('../assets/fonts/Lexend-ExtraBold.ttf'),
    LexendExtraLight: require('../assets/fonts/Lexend-ExtraLight.ttf'),
    LexendLight: require('../assets/fonts/Lexend-Light.ttf'),
    LexendMedium: require('../assets/fonts/Lexend-Medium.ttf'),
    LexendSemiBold: require('../assets/fonts/Lexend-SemiBold.ttf'),
    LexendThin: require('../assets/fonts/Lexend-Thin.ttf'),
  });
  const loading = useLoading();

  useEffect(() => {
    const loadApp = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setAppReady(true);
        router.replace("/(auth)"); // Navigate to splash screen
      }
    };

    loadApp();
  }, [fontsLoaded]);

  useEffect(() => {
    loading && setLoadingFunctions(loading); // store context into helper
  }, [loading]);

  if (!fontsLoaded || !appReady) {
    return <Slot />;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaView style={{ flex: 1 }}>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <AppNavigator />
                <Toast />
                <StatusBar style="dark" />
              </ThemeProvider>
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
