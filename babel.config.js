module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: 8,
        },
      },
    ],
    "@babel/preset-flow",
    "@babel/preset-react",
  ],
  ignore: ["**/node_modules/**/*", "**/public_html/**/build/**/*"],
  styledComponents: {
    pure: true,
  },
};
