const mix = require('laravel-mix');

let postCssPlugins = [
    require('tailwindcss'),
];

mix.setPublicPath('./');

mix.setResourceRoot('/themes/lovata-tailwind-shopaholic');

mix.js('assets/src/js/app.js', 'assets/dist/js');

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

mix.version();
