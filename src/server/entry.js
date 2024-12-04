//require("babel-core").transform("code", {});
require("babel-register")({
  presets: [
    [
      "env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "stage-3",
    "react",
  ],
  plugins: [
    ["babel-plugin-webpack-alias", { config: "./src/webpack/config.dev.js" }],
    // для стрелочных функций в классах
    "transform-class-properties",

    "loadable-components/babel",
    // для import("module") в ноде
    "dynamic-import-node",

    [
      "babel-plugin-styled-components",
      {
        ssr: true,
      },
    ],
  ],
})

require("./server")
