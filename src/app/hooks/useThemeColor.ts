import { Colors } from 'app/styles';
import useColorScheme from 'app/hooks/useColorScheme';

const useThemeColor = (
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  props: { light: string | string[]; dark: string | string[] } | null,
): NonNullable<string | string[]> => {
  const theme = useColorScheme();

  if (props) {
    const colorFromProps = props[theme];
    if (colorFromProps) {
      return colorFromProps;
    }
  }
  return Colors[theme][colorName] as NonNullable<string | string[]>;
};

export default useThemeColor;
