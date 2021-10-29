import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';

import { AppContext } from 'app/contexts/app/AppContext';
import { GlyphIcon, ResponsiveView, Button } from 'app/components/atoms';
import useThemeColor from 'app/hooks/useThemeColor';

import { WeatherContext } from 'weather/contexts/weather/WeatherContext';
import Utils from 'weather/utils';

import _t from 'mady';

import { styles } from './styles';

const utils = new Utils();

const WeatherButtons: React.FC = () => {
  const { data, dispatchData } = useContext(WeatherContext);
  const { app, dispatchApp } = useContext(AppContext);
  const [isRemoteData, setIsRemoteData] = useState(false);
  const [isChangeUnit, setIsChangeUnit] = useState(false);
  const [error, setError] = useState<Error>();

  const color = useThemeColor('text', null) as string;

  const handleRemoteData = useCallback(
    async (id?: string) => {
      const newUnitId = id || data.defaultUnit.id;
      const response = await utils.getWeatherRemoteData(app, newUnitId);
      if (response.error) {
        setIsRemoteData(false);
        setIsChangeUnit(false);
        return dispatchApp({
          type: 'SET_ERROR',
          payload: {
            error: response.error,
          },
        });
      }
      setIsRemoteData(false);
      setIsChangeUnit(false);
      return dispatchData({
        type: 'SET_ALL_WEATHER_DATA',
        payload: {
          defaultUnit: response.defaultUnit,
          weather: response.weather,
        },
      });
    },
    [app, data.defaultUnit.id, dispatchApp, dispatchData],
  );

  const handleSetIsRemoteData = async (): Promise<void> => {
    if (app.isConnected) {
      setIsRemoteData(true);
      handleRemoteData();
    } else {
      setError({
        name: 'INTERNET_DISCONNECTED',
        message: _t('You are disconnected. Check your internet connection'),
      });
    }
  };

  const handleSetIsChangeUnit = async (): Promise<void> => {
    if (app.isConnected) {
      const id = data.defaultUnit.id === 'metric' ? 'imperial' : 'metric';
      setIsChangeUnit(true);
      handleRemoteData(id);
    } else {
      setError({
        name: 'INTERNET_DISCONNECTED',
        message: _t('You are disconnected. Check your internet connection'),
      });
    }
  };

  useEffect(() => {
    dispatchApp({
      type: 'SET_ERROR',
      payload: {
        error,
      },
    });
  }, [dispatchApp, error]);

  return (
    <ResponsiveView type="child" style={styles.container}>
      <View>
        <Button
          isRefresh={isRemoteData}
          onPress={handleSetIsRemoteData}
          disabled={isRemoteData}>
          <GlyphIcon name="refresh" color={color} type="ionicons" />
        </Button>
      </View>
      <View>
        <Button
          isRefresh={isChangeUnit}
          onPress={handleSetIsChangeUnit}
          disabled={isChangeUnit}>
          <Text>{data.defaultUnit.id === 'metric' ? '°F' : '°C'}</Text>
        </Button>
      </View>
    </ResponsiveView>
  );
};

export default WeatherButtons;
