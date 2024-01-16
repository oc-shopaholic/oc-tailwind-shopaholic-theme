const mix = require('laravel-mix');
const jsFileList = [
  'assets/src/js/app',
  'pages/account-credentials/account-credentials',
  'pages/account-details/account-details',
  'pages/account-orders/account-orders',
  'pages/account-password-change/account-password-change',
  'pages/account/account',
  'pages/chackout-failure/chackout-failure',
  'pages/checkout-authentification/checkout-authentification',
  'pages/checkout-success/checkout-success',
  'pages/checkout/checkout',
  'pages/contact/contact',
  'pages/error-404/error-404',
  'pages/error-500/error-500',
  'pages/error-503/error-503',
  'pages/faq/faq',
  'pages/index/index',
  'pages/log-out/log-out',
  'pages/news-item/news-item',
  'pages/news-list/news-list',
  'pages/password-restore-success/password-restore-success',
  'pages/password-restore/password-restore',
  'pages/product-item/product-item',
  'pages/catalog/catalog',
  'pages/sign-in/sign-in',
  'pages/sign-up-confirmation/sign-up-confirmation',
  'pages/sign-up-success/sign-up-success',
  'pages/sign-up/sign-up',
  'pages/wish-list/wish-list',
];

let postCssPlugins = [
    require('tailwindcss'),
];

mix.setPublicPath('./');
mix.copy('node_modules/jquery/dist/jquery.min.js', 'assets/vendor/jquery.min.js');

jsFileList.forEach(fileName => mix.js(`./${fileName}.js`, 'assets/dist/js'));

mix.postCss('assets/src/css/app.css', 'assets/dist/css', postCssPlugins);

mix.browserSync({
  proxy: '172.17.0.1',
  open: false,
  reloadDelay: 500,
  files: [
    './content/**/*.htm',
    './layouts/*.htm',
    './pages/**/*.htm',
    './partials/**/*.htm'
  ],
});

mix.sourceMaps(true, 'source-map');
mix.extract(['jQuery']);
mix.version();
