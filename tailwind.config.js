module.exports = {
    content: [
        './index.ejs',
        "./**/*.{ejs, js}"
    ],
    theme: {
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
            '3xl': '1800px',
        },
        fontFamily: {
            "body": "Comfortaa, sans-serif",
            "text": "Avenir Next, sans-serif"
        },

        extend: {
            colors: {
                'primary': '#FCC800',
                'secondary': '#223146',
                'dRed': '#ED4036',
                'orange': '#F9951E',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
