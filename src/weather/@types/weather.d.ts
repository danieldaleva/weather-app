import { GeolocationResponse } from '@react-native-community/geolocation';

export {};

declare global {
  type UnitEntity = {
    readonly [id: string]: string;
    readonly label: string;
  };

  type WeatherContextEntity = {
    data: WeatherEntity;
    dispatchData: React.Dispatch<ReducerEntity>;
  };

  interface WeatherEntity {
    readonly defaultUnit: UnitEntity;
    readonly weather: WeatherResponseEntity | Record<string, any>;
  }

  interface RemoteDataEntity extends WeatherEntity {
    readonly error?: Error | undefined;
  }

  type WeatherResponseEntity = {
    readonly coord: {
      readonly latitude?: number | string;
      readonly longitude?: number | string;
    };
    readonly weather: [
      {
        readonly id: number | string;
        readonly main: string;
        readonly description: string;
        readonly icon: string;
      },
    ];
    readonly main: {
      readonly temp: number | string;
      readonly feels_like: number | string;
      readonly temp_min: number | string;
      readonly temp_max: number | string;
      readonly pressure: number | string;
      readonly sea_level: number;
      readonly humidity: number | string;
      readonly grnd_level: number | string;
    };
    readonly dt: number | string;
    readonly sys: {
      readonly type?: number | string;
      readonly id?: number | string;
      readonly message?: number | string;
      readonly country: string;
      readonly sunrise: number | string;
      readonly sunset: number;
    };
    readonly timezone: number | string;
    readonly id?: number | string;
    readonly name?: string;
    readonly cod?: number | string;
    readonly base?: string;
    readonly visibility?: number | string;
    readonly wind?: {
      readonly speed: number | string;
      readonly deg: number | string;
      readonly gust: number | string;
    };
    readonly clouds?: {
      readonly all: number | string;
    };
  };

  interface WeatherUtils extends AppUtils {
    appLoadWeatherImages(): Promise<void>;
    getWeatherApiUrl(
      defaultUnit: string,
      coords: GeolocationResponse['coords'],
      lang: string,
    ): Promise<string>;
    getWeatherDefaultUnit(update: string): Promise<UnitEntity>;
    setWeatherLocalStorage(remote: WeatherEntity): Promise<void>;
    getWeatherRemoteData(
      app: AppEntity,
      unit: string,
    ): Promise<RemoteDataEntity>;
  }
}
