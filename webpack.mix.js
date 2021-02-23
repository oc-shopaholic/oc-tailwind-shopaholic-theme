const mix = require('laravel-mix');

let postCssPlugins = [
    require('tailwindcss'),
    require('autoprefixer')
/*
    require('postcss-import'),
    require('postcss-nested'),
*/
];

mix.setPublicPath('./')
    .setResourceRoot('/themes/lovata-tailwind-shopaholic')
    .js('assets/src/js/app.js', 'assets/dist/js')
    .postCss('assets/src/css/app.css', 'assets/dist/css', postCssPlugins)
    .browserSync({
        proxy: 'http://127.0.0.1:8000/', //replace with your url
        files: [
            'layouts/**/*.htm',
            'pages/**/*.htm',
            'partials/**/*.htm',
            'assets/dist/js/app.js',
            'assets/dist/css/app.css',
        ]
    })
    .options({
        terser: {
          extractComments: false,
        },
        fileLoaderDirs: {
          fonts: '/assets/dist/fonts', // Where fonts will be loaded into from node_modules
        },
    });
