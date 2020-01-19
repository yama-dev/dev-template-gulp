import CONFIG from './.dev/config';

let _config = {
  mode: CONFIG.env.production ? 'production' : 'development',

  entry: {
    'assets/js/site.default': `${__dirname}/src/assets/js/site.default.js`
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

if(!CONFIG.env.production){
  _config.devtool = 'source-map';
}

module.exports = _config;
