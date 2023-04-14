const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-variable)', ...defaultTheme.fontFamily.sans],
            },
            maxWidth: {
                '8xl': '1536px',
            },
            colors: {
                neutral: {
                    1000: '#0F0F0F',
                },
            },
        },
    },
    plugins: [],
};
