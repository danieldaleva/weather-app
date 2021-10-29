import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

import { Colors } from 'app/styles';
import { GlyphIcon } from 'app/components/atoms';

import { TAB_BOTTOM_DEFAULT_PADDING } from 'app/constants';

import StorybookScreen from 'storybook/screens/StorybookScreen';
import WeatherScreen from 'weather/screens/WeatherScreen';
import { Routes } from './types';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator: React.FC = () => (
  <BottomTab.Navigator
    initialRouteName={Routes.Weather}
    screenOptions={{
      tabBarInactiveTintColor: Colors.dark.tabIconDefault,
      tabBarActiveTintColor: Colors.dark.tabIconSelected,
      tabBarStyle: {
        backgroundColor: Colors.dark.background,
        height: TAB_BOTTOM_DEFAULT_PADDING,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        paddingTop: 8,
      },
    }}>
    <BottomTab.Screen
      name={Routes.Weather}
      component={WeatherScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <GlyphIcon name="partly-sunny" type="ionicons" color={color} />
        ),
      }}
    />
    <BottomTab.Screen
      name={Routes.Storybook}
      component={StorybookScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <GlyphIcon name="puzzle-piece" type="fontawesome" color={color} />
        ),
      }}
    />
  </BottomTab.Navigator>
);

export default BottomTabNavigator;
