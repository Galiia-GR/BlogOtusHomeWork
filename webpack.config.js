const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const { NODE_ENV } = process.env;

const glob = require("glob");

const pages = glob.sync("src/pages/*.html");

module.exports = {
  entry: resolve(__dirname, "src/index.js"),

  output: {
    filename: "bundle.js",
    path: resolve(`${__dirname}/dist`),
    clean: true,

    environment: {
      arrowFunction: false,
    },
  },

  devtool: NODE_ENV === "production" ? "hidden-source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: "./images/[contenthash][ext]",
        },
      },
      {
        // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        // https://webpack.js.org/loaders/html-loader/#usage
        resourceQuery: /template/,
        loader: "html-loader",
      },
    ],
  },

  mode: NODE_ENV === "production" ? "production" : "development",

  plugins: [
    ...pages.map(
      (file) =>
        new HtmlWebpackPlugin({
          filename: file.replace(/^src\/pages\//, ""),
          template: file,
          inject: true,
        })
    ),

    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),

    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        proxy: "http://localhost:9000/",
      },
      {
        reload: false,
      }
    ),
  ],

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },

  devServer: {
    compress: true,
    port: 9000,
    client: {
      logging: "info",
    },
  },
};
