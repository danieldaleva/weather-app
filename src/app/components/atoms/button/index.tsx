import { Link } from '@react-navigation/native';
import useThemeColor from 'app/hooks/useThemeColor';
import { Colors } from 'app/styles';
import React from 'react';
import {
  Pressable,
  PressableProps,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Buttons } from 'weather/styles';

const Button: React.FC<
  PressableProps &
    View['props'] & {
      isRefresh?: boolean | undefined;
      buttonStyle?: StyleProp<ViewStyle> | undefined;
      buttonTextStyle?: StyleProp<TextStyle> | undefined;
    }
> = (
  props: PressableProps &
    View['props'] & {
      isRefresh?: boolean | undefined;
      buttonStyle?: StyleProp<ViewStyle> | undefined;
      buttonTextStyle?: StyleProp<TextStyle> | undefined;
    },
) => {
  const { children, isRefresh, buttonStyle, buttonTextStyle, onPress } = props;
  const color = useThemeColor('text', null) as string;

  return (
    <Link to={'#'}>
      <Pressable
        onPress={onPress}
        disabled={isRefresh}
        style={({ pressed }) => [
          buttonStyle,
          Buttons.default,
          Buttons.size,

          {
            backgroundColor:
              pressed || isRefresh ? Colors.light.buttonActive : 'transparent',
          },
        ]}>
        {isRefresh ? (
          <View style={[buttonStyle, Buttons.default, Buttons.size]}>
            <ActivityIndicator color={Colors.dark.default} size="small" />
          </View>
        ) : (
          <Text style={[Buttons.fontSize, { color }, buttonTextStyle]}>
            {!isRefresh ? children : ''}
          </Text>
        )}
      </Pressable>
    </Link>
  );
};

export default Button;
