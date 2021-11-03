import React, { useCallback, useContext, useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';

import * as Location from 'expo-location';

import LocalStorage from 'app/providers/storage';
import { AppContext } from 'app/contexts/app/AppContext';
import useThemeColor from 'app/hooks/useThemeColor';

import { WeatherContext } from 'weather/contexts/weather/WeatherContext';
import { WeatherButtons } from 'weather/components/molecules';
import {
  WeatherHeader,
  WeatherContent,
  WeatherFooter,
} from 'weather/components/organisms';

import Utils from 'weather/providers/utils';

import { ResponsiveScrollView, ResponsiveView } from 'app/components/atoms';
import { styles } from './styles';

const utils = new Utils();

const WeatherTemplate: React.FC = () => {
  const { app, dispatchApp } = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);
  const { data, dispatchData } = useContext(WeatherContext);
  const [location, setLocation] = useState<
    Location.LocationObject | undefined
  >();

  const color = useThemeColor('text', null) as string;

  const handleLocation = async (): Promise<void> => {
    const isDeviceLocationEnabled = await Location.hasServicesEnabledAsync();

    if (isDeviceLocationEnabled) {
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 20,
        },
        (res: Location.LocationObject) => {
          setLocation(res);
        },
      );
    }
  };

  useEffect(() => {
    if (location) {
      dispatchApp({
        type: 'SET_APP_LOCATION',
        payload: {
          location,
        },
      });
    }
  }, [dispatchApp, location]);

  const handleRemoteData = useCallback(async () => {
    const currentData: WeatherEntity = await LocalStorage.getLocalStorage(
      'currentData',
    );
    const unit = currentData ? currentData.defaultUnit : data.defaultUnit;

    const response = await utils.getWeatherRemoteData(app, unit.id);

    if (response.error) {
      dispatchApp({
        type: 'SET_ERROR',
        payload: {
          error: response.error,
        },
      });
    } else {
      dispatchData({
        type: 'SET_ALL_WEATHER_DATA',
        payload: {
          defaultUnit: response.defaultUnit,
          weather: response.weather,
        },
      });
    }
  }, [app, data.defaultUnit, dispatchApp, dispatchData]);

  const onRefresh = useCallback(async () => {
    if (app.isConnected) {
      setRefreshing(true);
      await handleRemoteData();
      await handleLocation();
      setRefreshing(false);
    }
  }, [app.isConnected, handleRemoteData]);

  return (
    <ResponsiveScrollView
      style={styles.container}
      type="parent"
      refreshControl={
        <RefreshControl
          tintColor={color}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <ResponsiveView type="child">
        <View style={[styles.header]}>
          <WeatherHeader />
        </View>
        <View>
          <WeatherContent />
        </View>
        <View style={styles.footer}>
          <WeatherButtons />
          <WeatherFooter />
        </View>
      </ResponsiveView>
    </ResponsiveScrollView>
  );
};

export default WeatherTemplate;
