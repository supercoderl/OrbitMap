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
import { toastConfig } from '@/components/Notifications/toast';

import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { set_storage_data } from '@/utils';
import { getCityList } from '@/api/modules/city';
import { ActionStatus } from '@/enums';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
enableScreens();

// Register the task
TaskManager.defineTask(process.env.EXPO_PUBLIC_BACKGROUND_FETCH_CITY_TASK as string, async () => {
  try {
    // Fetch your cities data here
    const response = await fetchCitiesFromAPI();
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Error in background fetch:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// This is your API function that will be called both in foreground and background
const fetchCitiesFromAPI = async () => {
  // In a real app, this would be a network request

  const { data } = await getCityList({
    query: { pageSize: 63, pageIndex: 1 },
    searchTerm: "",
    status: ActionStatus.All
  });

  if (data && data.items.length > 0) {
    // Save to AsyncStorage for use across app launches
    await set_storage_data('cities', data.items);

    return data.items;
  }

  return [];
};

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

  const registerBackgroundFetch = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(process.env.EXPO_PUBLIC_BACKGROUND_FETCH_CITY_TASK as string, {
        minimumInterval: 60 * 15, // 15 minutes
        stopOnTerminate: false,   // Continue in background
        startOnBoot: true,        // Start on device boot
      });
      console.log('Background fetch task registered');
    } catch (error) {
      console.error('Background fetch registration failed:', error);
    }
  };

  // Unregister the background fetch task
  const unregisterBackgroundFetch = async () => {
    try {
      await BackgroundFetch.unregisterTaskAsync(process.env.EXPO_PUBLIC_BACKGROUND_FETCH_CITY_TASK as string);
      console.log('Background fetch task unregistered');
    } catch (error) {
      console.error('Background fetch unregistration failed:', error);
    }
  };

  // Register background fetch task when component mounts
  useEffect(() => {
    registerBackgroundFetch();

    // Cleanup function
    return () => {
      unregisterBackgroundFetch();
    };
  }, []);

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
                <Toast config={toastConfig} />
                <StatusBar style="dark" />
              </ThemeProvider>
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
