import React, { ReducerState } from 'react';

const WeatherReducer: React.Reducer<WeatherEntity, ReducerEntity> = (
  state: ReducerState<any>,
  action: ReducerEntity,
) => {
  switch (action.type) {
    case 'SET_ALL_WEATHER_DATA':
      if (
        (state as any).weather === action.payload.weather &&
        (state as any).defaultUnit === action.payload.defaultUnit
      ) {
        return state;
      }
      return {
        ...(state as any),
        weather: action.payload.weather,
        defaultUnit: action.payload.defaultUnit,
      };
    case 'SET_WEATHER_DATA':
      if ((state as any).weather === action.payload.weather) {
        return state;
      }
      return {
        ...(state as any),
        weather: action.payload.weather,
      };
    case 'SET_UNIT_DATA':
      if ((state as any).defaultUnit === action.payload.defaultUnit) {
        return state;
      }
      return {
        ...(state as any),
        defaultUnit: action.payload.defaultUnit,
      };
    default:
      return state;
  }
};

export default WeatherReducer;
