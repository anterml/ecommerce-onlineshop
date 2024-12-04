import webpackDevMiddleware from "webpack-dev-middleware"
import webpack from "webpack"
import webpackConfig from "../webpack/config.dev"

module.exports = app => {
  const hmrNames = ["client", "admin"]
  webpackConfig.forEach((config, i) => {
    var compiler = webpack(config)

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true,
        stats: {
          colors: true,
        },
      }),
    )

    app.use(
      require("webpack-hot-middleware")(compiler, {
        path: "/__webpack_hmr_" + hmrNames[i],
      }),
    )
  })
}
