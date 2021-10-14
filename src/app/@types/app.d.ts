/* eslint-disable no-undef */
import React from 'react';
import { GeolocationResponse } from '@react-native-community/geolocation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScaledSize } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { Routes } from 'app/navigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }

  type RootStackParamList = {
    readonly [Routes.Root]: NavigatorScreenParams<RootTabParamList> | undefined;
    readonly [Routes.Loader]: undefined;
  };

  type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;

  type RootTabParamList = {
    readonly [Routes.Weather]: undefined;
    readonly [Routes.Storybook]: undefined;
  };

  type RootTabScreenProps<Screen extends keyof RootTabParamList> =
    CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList, Screen>,
      NativeStackScreenProps<RootStackParamList>
    >;

  type AppContextEntity = {
    readonly app: AppEntity;
    readonly dispatchApp: React.Dispatch<ReducerEntity>;
  };

  type AppEntity = {
    readonly lang: string;
    readonly timezone: string;
    readonly isConnected: boolean | null;
    readonly isDataLoaded: boolean;
    readonly error: Error | null;
    readonly location: GeolocationResponse | null;
    readonly dimensions: ScaledSize;
    readonly colorScheme: string;
  };

  type ReactPropsEntity = {
    readonly children?: React.ReactNode;
  };

  type ReducerEntity = {
    readonly type: string;
    readonly payload: Record<string, unknown>;
  };

  interface LocalStorageInterface {
    setLocalStorage(collection: string, value?: any): Promise<any>;
    getLocalStorage(
      collection: string,
      field: string,
      operator: string,
      value: any,
    ): Promise<any>;
    removeItemLocalStorage(
      collection: string,
      id: string,
      object: any,
    ): Promise<void>;
    clearLocalStorage(): void;
  }

  interface AppUtils {
    objectFilter(obj: unknown[], origin: unknown): unknown[];
    isObjectNotEmpty(obj: unknown): boolean;
    appDimensions(
      setState: React.Dispatch<React.SetStateAction<ScaledSize>>,
    ): void;
    appConnection(
      setState: React.Dispatch<React.SetStateAction<boolean | null>>,
      setError?: React.Dispatch<React.SetStateAction<Error | null>>,
    ): void;
    appLocation(
      setLocation: React.Dispatch<
        React.SetStateAction<GeolocationResponse | null>
      >,
      setError: React.Dispatch<React.SetStateAction<Error | null>>,
    ): Promise<void>;
    appLanguage(
      setState: React.Dispatch<React.SetStateAction<string>>,
    ): Promise<void>;
    appTimezone(
      setState: React.Dispatch<React.SetStateAction<string>>,
    ): Promise<void>;
    appLoadFonts(): Promise<void>;
  }
}
