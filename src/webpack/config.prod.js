const { resolve } = require("path")
const webpack = require("webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = [
  {
    name: "client-rendering",
    devtool: "source-map",
    mode: "production",

    context: resolve(__dirname, "../client"),

    entry: {
      main: "./client.js",
    },

    output: {
      filename: "[name].js",
      chunkFilename: "chunks/client/[name].js",
      path: resolve(__dirname, "../../dist"),
      publicPath: "/dist/",
    },

    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        utils: resolve(__dirname, "../shared/utils/"),
        globalComponents: resolve(__dirname, "../shared/components/utils/"),
        server: resolve(__dirname, "../server/"),
      },
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },

    optimization: {
      //minimize: false,
      splitChunks: {
        name: "bootstrap",
        chunks: "all",
      },
    },

    plugins: [
      new CleanWebpackPlugin(["dist"], {
        root: process.cwd(),
      }),
      //new webpack.NamedModulesPlugin(),
    ],
  },

  {
    name: "admin-rendering",
    devtool: "source-map",
    mode: "production",

    context: resolve(__dirname, "../client"),

    entry: {
      "admin-main": "./admin.js",
    },

    output: {
      filename: "[name].js",
      chunkFilename: "chunks/admin/[name].js",
      path: resolve(__dirname, "../../dist"),
      publicPath: "/dist/",
    },

    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        utils: resolve(__dirname, "../shared/utils/"),
        globalComponents: resolve(__dirname, "../shared/components/utils/"),
        server: resolve(__dirname, "../server/"),
      },
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },

    optimization: {
      //minimize: false,
      splitChunks: {
        name: "bootstrap",
        chunks: "all",
      },
    },

    plugins: [
      //new webpack.NamedModulesPlugin(),
    ],
  },

  {
    name: "server-side rendering",
    devtool: "source-map",
    mode: "production",

    context: resolve(__dirname, "../server"),

    entry: "./server.js",

    target: "node",
    externals: /^[a-z\-0-9]+$/,

    mode: "production",
    output: {
      filename: "server-main-15ef667b.js",
      chunkFilename: "chunks/server/[name]-15ef667b.js",
      path: resolve(__dirname, "../../dist"),
      publicPath: "/dist/",
      libraryTarget: "commonjs2",
    },

    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        utils: resolve(__dirname, "../shared/utils/"),
        globalComponents: resolve(__dirname, "../shared/components/utils/"),
        server: resolve(__dirname, "../server/"),
      },
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },

    optimization: {
      //minimize: false,
      splitChunks: {
        //minSize: 1000,
        name: "bootstrap",
        chunks: "async",
      },
    },

    plugins: [
      /*
      new CleanWebpackPlugin(['dist'], {
        root: process.cwd()
      }),
      */
      //new webpack.NamedModulesPlugin(),
    ],
  },
]
