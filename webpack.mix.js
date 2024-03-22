const mix = require('laravel-mix');
const jsFileList = [
  'js/vendor/app',
  'js/pages/account-orders',
  'js/pages/sign-in-checkout',
  'js/pages/checkout',
  'js/pages/contact',
  'js/pages/faq',
  'js/pages/index',
  'js/pages/password-reset',
  'js/pages/product-item',
  'js/pages/catalog',
  'js/pages/sign-in',
  'js/pages/sign-up'
];

let postCssPlugins = [
    require('tailwindcss'),
];

mix.setPublicPath('./');

jsFileList.forEach(fileName => mix.js(`./${fileName}.js`, 'assets/dist/js'));

mix.postCss('assets/src/css/app.css', 'assets/dist/css', postCssPlugins);

mix.browserSync({
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
