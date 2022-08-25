module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            components: './src/components',
            libs: './src/libs',
            models: './src/models',
            pages: './src/pages',
            utils: './src/utils',
          },
        },
      ],
    ],
  };
};
