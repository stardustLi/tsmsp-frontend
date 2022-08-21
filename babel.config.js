module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            Pages: './src/Pages',
            Globals: "./src/Globals",
            Images: "./src/Images",
            Plugins: "./src/Plugins",
            Styles: "./src/Styles",
            Types: "./src/Types",
            Assets: "./src/Assets",
            Messages: "./src/Messages",
          },
        },
      ],
    ],
  };
};
