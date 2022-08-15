module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            Assets: './src/Assets',
            Pages: './src/Pages',
            Globals: "./src/Globals",
            Images: "./src/Images",
            Plugins: "./src/Plugins",
            Styles: "./src/Styles",
            Utils: "./src/Utils"
          },
        },
      ],
    ],
  };
};
