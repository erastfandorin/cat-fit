const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    script: ["@babel/polyfill", "./src/js/_script.js"],
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },

  plugins: [
    // Generating HTML
    new HtmlWebpackPlugin({
      template: "src/pug/sections/catalog/catalog.pug",
      filename: "catalog.html",
    }),
    new HtmlWebpackPlugin({
      template: "src/pug/_index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({ filename: "_style.css" }), // Generating CSS
    new CopyWebpackPlugin([{ from: "src/img", to: "img" }]), // Copy images
  ],

  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },

  module: {
    rules: [
      // HTML
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          // Extract to external CSS file
          { loader: MiniCssExtractPlugin.loader },

          // Regular CSS
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              sourceMap: true,
              url: false,
            },
          },

          // PostCSS with plugins
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-nested"),
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                  autoprefixer: {
                    flexbox: "no-2009",
                  },
                  stage: 3,
                }),
              ],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  // Development server
  devServer: {
    contentBase: path.join(__dirname, "build"),
    port: 4000,
    writeToDisk: true,
  },

  mode: process.env.NODE_ENV || "development",
};
