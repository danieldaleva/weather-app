/** Palette definition */
const tintColorLight = '#ffcc00';
const tintColorDark = '#ffcc00';
const lightColor = '#f4f5f8';
const mediumColor = '#d7d8da';
const darkColor = '#000000';
const warningColor = '#dc3545';
const gradientLight = ['#1ca8db', '#39a0d3', '#03749e'];
const gradientDark = ['#137da5', '#1f5a80', '#16466a'];
const backgroundColor = '#1ca8db';
const buttonActive = '#f4f5f8a1';
const borderColor = '#d7d8da1';
const transparency = '#ffffff00';

/** Color Valiables */
const colors = {
  default: darkColor,
  primary: tintColorLight,
  transparent: transparency,
  card: lightColor,
  border: mediumColor,
  notification: warningColor,
  text: lightColor,
  buttonActive: buttonActive,
  background: backgroundColor,
  gradient: gradientDark,
  tint: tintColorDark,
  tabIconDefault: mediumColor,
  tabIconSelected: tintColorLight,
  drawerIconDefaul: mediumColor,
  drawerIconSelected: tintColorLight,
  borderColor: borderColor,
};

/**
 * Automated Theme Styles
 * dark and light themes share the same
 * colors except for the gradient color
 */
export default {
  dark: colors,
  light: { ...colors, gradient: gradientLight },
};
