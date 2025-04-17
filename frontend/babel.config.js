// Correct babel.config.js structure
module.exports = function (api) {
  api.cache(true); // Keep this
  return {
    // 'presets' should be an array of strings or ['name', {options}] tuples
    presets: ["babel-preset-expo"],

    // // 'plugins' should ALSO be an array of strings or ['name', {options}] tuples
    // plugins: [
    //   "nativewind/babel",
    //   // Add other plugins here if needed, e.g.:
    //   // 'react-native-reanimated/plugin',
    // ],
  };
};
