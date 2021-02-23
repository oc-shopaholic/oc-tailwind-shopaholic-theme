module.exports = {
	purge: [
	'./layouts/**/*.htm',
	'./pages/**/*.htm',
	'./partials/**/*.htm',
    ],
    plugins: [
        //require('@tailwindcss/typography'), // Removed for compatibility reasons
    ],
    theme: {
        colors: {
            primary: {
                lightest: '#079BFB',
                light: '#007BCB',
                DEFAULT: '#005C97',
                dark: '#004A7A',
                darkest: '#00375B'
            },
            secondary: {
                lightest: '#FF8D8D',
                light: '#DD5656',
                DEFAULT: '#C53030',
                dark: '#9F1717',
                darkest: '#760000'
            },
            tertiary: {
                lightest: '#FFE9BE',
                light: '#EEC46E',
                DEFAULT: '#C59431',
                dark: '#8F630C',
                darkest: '#493100'
            },
            grey: {
                lightest: '#EEE',
                light: '#BBB',
                DEFAULT: '#888',
                dark: '#555',
                darkest: '#222'
            },
            gray: {
                '100': '#f5f5f5',
                '200': '#eeeeee',
                '300': '#e0e0e0',
                '400': '#bdbdbd',
                '500': '#9e9e9e',
                '600': '#757575',
                '700': '#616161',
                '800': '#424242',
                '900': '#212121',
            },
            error: '#FF6363',
            white: '#FFFFFF',
            black: '#000000',
            red:   '#FF0000',
            green: '#00FF00',
            blue:  '#0000FF',
            transparent: 'transparent'
        },
        fontFamily: {
            body: ['Poppins','sans-serif'],
            display: ['Poppins', 'sans-serif']
        }
    }
}
