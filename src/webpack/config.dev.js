import { resolve } from "path"
import webpack from "webpack"

export default [
  {
    devtool: "inline-source-map",
    context: resolve(__dirname, "../client"),
    entry: {
      main: [
        "webpack-hot-middleware/client?path=/__webpack_hmr_client",
        "./client.js",
      ],
    },
    mode: "development",
    output: {
      filename: "[name].js",
      chunkFilename: "chunks/client/[name].js",
      path: resolve(__dirname, "../../dev"),
      publicPath: "/dev/",
    },

    devServer: {
      hot: true,
      //contentBase: resolve(__dirname, 'dev'),
      //publicPath: '/dev/',
      contentBase: "./dev",
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

        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
                //localIdentName: '[name]-[local]-[hash:5]',
              },
            },
          ],
        },
      ],
    },

    optimization: {
      splitChunks: {
        name: "bootstrap",
        chunks: "all",
      },
    },

    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },

  {
    devtool: "inline-source-map",
    context: resolve(__dirname, "../client"),
    entry: {
      "admin-main": [
        "webpack-hot-middleware/client?path=/__webpack_hmr_admin",
        "./admin.js",
      ],
    },
    mode: "development",
    output: {
      filename: "[name].js",
      chunkFilename: "chunks/admin/[name].js",
      path: resolve(__dirname, "../../dev"),
      publicPath: "/dev/",
    },

    devServer: {
      hot: true,
      //contentBase: resolve(__dirname, 'dev'),
      //publicPath: '/dev/',
      contentBase: "./dev",
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

        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
                //localIdentName: '[name]-[local]-[hash:5]',
              },
            },
          ],
        },
      ],
    },

    optimization: {
      splitChunks: {
        name: "bootstrap",
        chunks: "all",
      },
    },

    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
]
