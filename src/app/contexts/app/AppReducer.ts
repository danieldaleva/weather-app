import { ReducerState } from 'react';

const AppReducer: React.Reducer<any, ReducerEntity> = (
  state: ReducerState<any>,
  action: ReducerEntity,
) => {
  switch (action.type) {
    case 'SET_APP_ALL_DATA':
      if (
        (state as AppEntity).location === action.payload.location &&
        (state as AppEntity).lang === action.payload.lang &&
        (state as AppEntity).timezone === action.payload.timezone &&
        (state as AppEntity).colorScheme === action.payload.colorScheme
      ) {
        return state;
      }
      return {
        ...(state as AppEntity),
        location: action.payload.location,
        lang: action.payload.lang,
        timezone: action.payload.timezone,
        colorScheme: action.payload.colorScheme,
      };

    case 'SET_APP_LOCATION':
      if ((state as AppEntity).location === action.payload.location) {
        return state;
      }
      return {
        ...(state as AppEntity),
        location: action.payload.location,
      };

    case 'SET_APP_LANG':
      if ((state as AppEntity).lang === action.payload.lang) {
        return state;
      }
      return {
        ...(state as AppEntity),
        lang: action.payload.lang,
      };

    case 'SET_APP_TIMEZONE':
      if ((state as AppEntity).timezone === action.payload.timezone) {
        return state;
      }
      return {
        ...(state as AppEntity),
        timezone: action.payload.timezone,
      };

    case 'SET_APP_COLOR_SCHEME':
      if ((state as AppEntity).colorScheme === action.payload.colorScheme) {
        return state;
      }
      return {
        ...(state as AppEntity),
        colorScheme: action.payload.colorScheme,
      };

    case 'SET_APP_DIMENSIONS':
      if ((state as AppEntity).dimensions === action.payload.dimensions) {
        return state;
      }
      return {
        ...(state as AppEntity),
        dimensions: action.payload.dimensions,
      };

    case 'SET_APP_IS_CONNECTED':
      if ((state as AppEntity).isConnected === action.payload.isConnected) {
        return state;
      }
      return {
        ...(state as AppEntity),
        isConnected: action.payload.isConnected,
      };

    case 'SET_APP_IS_LOADED':
      return {
        ...(state as AppEntity),
        isAppLoaded: action.payload.isAppLoaded,
      };
    case 'SET_ERROR':
      return {
        ...(state as AppEntity),
        error: action.payload.error,
      };
    default:
      return state as AppEntity;
  }
};

export default AppReducer;
