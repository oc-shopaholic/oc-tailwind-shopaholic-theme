const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',

      // $: require.resolve('jquery'),
      // jQuery: require.resolve('jquery'),
      // 'window.jQuery': require.resolve('jquery'),
      // 'window.$': require.resolve('jquery'),
    })
  ],

};
