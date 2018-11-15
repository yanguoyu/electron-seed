require('@babel/register')({
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": "commonjs"
      }
    ]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "regenerator": true
    }]
  ]
});
require('./main');
