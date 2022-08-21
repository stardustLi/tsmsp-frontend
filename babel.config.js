const setupAbsoluteImports = require('react-native-absolute-imports');

const alias= setupAbsoluteImports({tsEnabled: true, srcDirName: 'src'});

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias
        },
      ],
    ],
  };
};
