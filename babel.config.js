module.exports = function (api) {
  api.cache(true);
  let plugins = [['module-resolver', { root: ['./'], alias: { '@': './src' } }]];

  plugins.push('react-native-worklets/plugin');

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
