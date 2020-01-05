import CONFIG from './dev/config';

let _config = {
  mode: CONFIG.env.prod ? 'production' : 'development',

  entry: {
    'assets/js/site.default': `./src/assets/js/site.default.es`
  },

  output: {
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }
    ]
  }
};

if(!CONFIG.env.prod){
  _config.devtool = 'source-map';
}

module.exports = _config;
