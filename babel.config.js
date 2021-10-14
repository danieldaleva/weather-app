module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: './src',
          alias: {
            app: './src/app',
            storybook: './src/storybook',
            weather: './src/weather',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
