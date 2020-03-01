const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const src = path.join(__dirname, 'main');
const dist = path.join(__dirname, 'public');

module.exports = {
  entry: {
    main: path.join(src, 'main.js'),
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [src],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [src],
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader'],
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  mode: 'development',
  output: {
    path: dist,
    filename: 'bundle.js',
  },
};
