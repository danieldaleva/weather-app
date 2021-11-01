import React from 'react';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import Utils from 'weather/utils';

const utils = new Utils();

const useCachedResources = (): NonNullable<boolean> => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  /**
   * Load any resources or data that
   * we need prior to rendering the app
   * @returns Promise<void>
   */
  const loadResourcesAndDataAsync = async (): Promise<void> => {
    try {
      SplashScreen.preventAutoHideAsync();
      await utils.appLoadFonts();
      if (Platform.OS === 'web') {
        await utils.appLoadWeatherImages();
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoadingComplete(true);
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete as NonNullable<boolean>;
};

export default useCachedResources;
