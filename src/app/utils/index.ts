import * as Location from 'expo-location';
import * as Localization from 'expo-localization';
import { Dimensions, ScaledSize } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

import * as appConstants from 'app/constants';

import * as Font from 'expo-font';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import pt_br from 'app/locales/pt-br';
import es from 'app/locales/es';
import _t from 'mady';

/**
 * Class Utils implementing AppUtils interface
 * @class {Utils}
 */
class Utils implements AppUtils {
  /**
   * Is object not empty
   * @param {unknown[]} obj
   * @param {unknonws} origin
   * @returns {unknown[]}
   */
  objectFilter = (obj: unknown[], origin: unknown): unknown[] => {
    const arr: unknown[] = [];
    Object.keys(obj).forEach((key, i) => {
      if (key === origin) {
        arr.push(obj[i]);
      }
    });
    return arr;
  };

  /**
   * Is object not empty
   * @obj Object
   * @returns boolean
   */
  isObjectNotEmpty = (obj: Object): boolean => {
    if (obj && Object.keys(obj)?.length) {
      return true;
    }
    return false;
  };

  /**
   * App window dimensions
   * @param {React.Dispatch<React.SetStateAction<boolean | null>>} setDimensions
   * @returns {void}
   */
  appDimensions = (
    setDimensions: React.Dispatch<React.SetStateAction<ScaledSize>>,
  ) => {
    const onDimensionsChange = ({ window }: { window: ScaledSize }): void => {
      setDimensions(window);
    };

    Dimensions.addEventListener('change', onDimensionsChange);
    return () => Dimensions.removeEventListener('change', onDimensionsChange);
  };

  /**
   * App connection
   * @param {React.Dispatch<React.SetStateAction<boolean | null>>} setIsConnected
   * @param {React.Dispatch<React.SetStateAction<Error | null>>} setError
   * @returns {Promise<void>}
   */
  appConnection = (
    setIsConnected: React.Dispatch<React.SetStateAction<boolean | null>>,
    setError: React.Dispatch<React.SetStateAction<Error | null>>,
  ): void => {
    const onConnectionChange = (connection: boolean | null): void => {
      if (typeof connection === 'boolean') {
        if (connection) {
          setIsConnected(connection);
        } else {
          setError({
            name: 'INTERNET_DISCONNECTED',
            message: _t('You are disconnected. Check your internet connection'),
          });
        }
      }
    };

    NetInfo.addEventListener(connection =>
      onConnectionChange(connection?.isInternetReachable),
    );
  };

  /**
   * App language
   * @param {React.Dispatch<React.SetStateAction<GeolocationResponse | null>>} setLocation
   * @param {React.Dispatch<React.SetStateAction<Error | null>>} setError
   * @returns {Promise<void>}
   */
  appLocation = async (
    setLocation: React.Dispatch<
      React.SetStateAction<GeolocationResponse | null>
    >,
    setError: React.Dispatch<React.SetStateAction<Error | null>>,
  ): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      const isDeviceLocationEnabled = await Location.hasServicesEnabledAsync();

      if (isDeviceLocationEnabled) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
          },
          (error: any) => {
            throw new Error(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          },
        );
      } else {
        setError({
          name: 'LOCATION_IS_OFF',
          message: _t('Turn on your location first'),
        });
      }
    } else {
      setError({
        name: 'LOCATION_NOT_PERMITED',
        message: _t('Location permission not granted'),
      });
    }
  };

  /**
   * App language
   * @param {React.Dispatch<React.SetStateAction<string>>} setLang
   * @returns {Promise<void>}
   */
  appLanguage = async (
    setLang: React.Dispatch<React.SetStateAction<string>>,
  ): Promise<void> => {
    if (Localization.locale) {
      setLang(Localization.locale);

      if (Localization.locale.indexOf('pt') > -1) {
        _t.addLocales('pt-br', pt_br);
        _t.setLocales('pt-br');
      }
      if (Localization.locale.indexOf('es') > -1) {
        _t.addLocales('es', es);
        _t.setLocales('es');
      }
    }
  };

  /**
   * App timezone
   * @param {React.Dispatch<React.SetStateAction<string>>} setTimezone
   * @returns {Promise<void>}
   */
  appTimezone = async (
    setTimezone: React.Dispatch<React.SetStateAction<string>>,
  ): Promise<void> => {
    if (Localization.locale) {
      setTimezone(Localization.timezone || appConstants.TZ);
    }
  };

  /** Load app fonts
   * @returns {Promise<void>}
   */
  appLoadFonts = async (): Promise<void> => {
    Font.loadAsync({
      ...Ionicons.font,
      ...FontAwesome5.font,
      'Lato-Thin': require('app/assets/fonts/Lato-Thin.ttf'),
      'Lato-Thin-Italic': require('app/assets/fonts/Lato-ThinItalic.ttf'),
      'Lato-Light-Regular': require('app/assets/fonts/Lato-Light.ttf'),
      'Lato-Light-Italic': require('app/assets/fonts/Lato-LightItalic.ttf'),
      'Lato-Regular': require('app/assets/fonts/Lato-Regular.ttf'),
      'Lato-Italic': require('app/assets/fonts/Lato-Italic.ttf'),
      'Lato-Bold-Regular': require('app/assets/fonts/Lato-Bold.ttf'),
      'Lato-Bold-Italic': require('app/assets/fonts/Lato-BoldItalic.ttf'),
      'Lato-Black-Regular': require('app/assets/fonts/Lato-Black.ttf'),
      'Lato-Black-Italic': require('app/assets/fonts/Lato-BlackItalic.ttf'),

      'Swiss721-Bold-Regular': require('app/assets/fonts/swisscb.ttf'),
      'Swiss721-Bold-Italic': require('app/assets/fonts/swisscbi.ttf'),
      'Swiss721-Roman-Regular': require('app/assets/fonts/swissc.ttf'),
      'Swiss721-Roman-Italic': require('app/assets/fonts/swissci.ttf'),
      'Swiss721-Black-Regular': require('app/assets/fonts/swissck.ttf'),
      'Swiss721-Black-Italic': require('app/assets/fonts/swisscki.ttf'),
      'Swiss721-Light-Regular': require('app/assets/fonts/swisscl.ttf'),
      'Swiss721-Light-Italic': require('app/assets/fonts/swisscli.ttf'),
    });
  };
}

export default Utils;
