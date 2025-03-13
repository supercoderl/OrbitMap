import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AppNavigator from '@/routes';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
enableScreens();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Slot />;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AppNavigator />
            <StatusBar style="dark" />
          </ThemeProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
