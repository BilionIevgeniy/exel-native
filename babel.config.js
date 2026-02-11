module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "17",
        },
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-class-properties"],
};
