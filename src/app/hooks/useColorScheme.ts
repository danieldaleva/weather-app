import { useEffect, useState } from 'react';

/**
 * Hook for app Color Scheme
 * @returns NonNullable<'light' | 'dark'
 */
const useColorScheme = (): NonNullable<'light' | 'dark'> => {
  const [colorScheme, setColorScheme] = useState('light');

  /**
   * Get color scheme based in time
   * @returns string ```light``` or ```dark```
   */
  const getColorScheme = (): string => {
    const hour = new Date().getHours();
    return hour > 5 && hour < 18 ? 'light' : 'dark';
  };

  useEffect(() => {
    setColorScheme(getColorScheme());
  }, []);

  return colorScheme as NonNullable<'light' | 'dark'>;
};

export default useColorScheme;
