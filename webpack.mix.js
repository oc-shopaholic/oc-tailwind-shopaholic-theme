const mix = require('laravel-mix');

const jsFileList = [
  'assets/src/js/app',
  'pages/account-credentials',
  'pages/account-details',
  'pages/account-order-list',
  'pages/account-password-change',
  'pages/account',
  'pages/chackout-failure',
  'pages/checkout-authentification',
  'pages/checkout-success',
  'pages/checkout',
  'pages/contact',
  'pages/error-404',
  'pages/error-500',
  'pages/error-503',
  'pages/faq',
  'pages/index',
  'pages/log-out',
  'pages/news-item',
  'pages/news-list',
  'pages/password-restore-success',
  'pages/password-restore',
  'pages/product-item',
  'pages/product-list',
  'pages/sign-in',
  'pages/sign-up-confirmation',
  'pages/sign-up-success',
  'pages/sign-up',
  'pages/wish-list',
];

let postCssPlugins = [
    require('tailwindcss'),
];

mix.setPublicPath('./');

mix.setResourceRoot('/themes/lovata-tailwind-shopaholic');

mix.webpackConfig(webpack =>({
  plugins:[
    new webpack.ProvidePlugin({
      $: require.resolve('jquery'),
      jQuery: require.resolve('jquery'),
      'window.jQuery': require.resolve('jquery'),
      'window.$': require.resolve('jquery'),
    })
  ]
}))

jsFileList.forEach(fileName => mix.js(`./${fileName}.js`, 'assets/dist/js'));

mix.postCss('assets/src/css/app.css', 'assets/dist/css', postCssPlugins);

mix.browserSync({
  proxy: '172.17.0.1',
  open: false,
  reloadDelay: 500,
  files: [
    './content/**/*.htm',
    './layouts/*.htm',
    './pages/*.htm',
    './partials/**/*.htm'
  ],
});

mix.sourceMaps(true, 'source-map');
mix.extract(['jquery']);
mix.version();
