import * as Font from 'expo-font';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

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
  isObjectNotEmpty = (obj: Object | any): boolean => {
    if (obj && Object.keys(obj)?.length) {
      return true;
    }
    return false;
  };

  /** Load app fonts
   * @returns {Promise<void>}
   */
  appLoadFonts = async (): Promise<void> => {
    console.log('Loading fonts...');
    await Font.loadAsync({
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
    console.log('done...');
  };
}

export default Utils;
