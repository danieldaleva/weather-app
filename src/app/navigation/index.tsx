import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Toast from 'app/components/atoms/toast';
// import LoaderScreen from 'app/screens/loader/LoaderScreen';
// import { AppContext } from 'app/contexts/app/AppContext';
// import { useCachedResources } from 'app/hooks';

// import BottomTabNavigator from './BottomTabNavigation';
// import LinkingOptions from './LinkingOptions';
import { Colors } from 'app/styles';
import StorybookScreen from 'storybook/screens/StorybookScreen';

export enum Routes {
  Root = 'Root',
  Weather = 'Weather',
  Storybook = 'Storybook',
  Loader = 'Loader',
}

const RootStack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  // const { app } = useContext(AppContext);
  // const isResourceLoadingComplete = useCachedResources();
  return (
    <NavigationContainer
      theme={{ dark: true, colors: Colors.dark }}
      // linking={LinkingOptions}
    >
      {/* {app.error && <Toast message={app.error.message} />} */}
      <RootStack.Navigator
        // initialRouteName={Routes.Root}
        screenOptions={{
          headerShown: false,
        }}>
        {/* {app.isDataLoaded && isResourceLoadingComplete ? ( */}
        <RootStack.Screen
          name="Storybook"
          component={StorybookScreen}
          options={{ title: 'Weather App' }}
        />
        {/* ) : (
          <RootStack.Screen
            name={Routes.Loader}
            component={LoaderScreen}
            options={{ title: 'Loading...' }}
          />
        )} */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
