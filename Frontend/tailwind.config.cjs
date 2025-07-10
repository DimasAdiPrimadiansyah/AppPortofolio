/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            // -- MULAI PENAMBAHAN --
            fontFamily: {
                // Opsional: Tambahkan font kustom jika Anda punya
                // sans: ['Inter', 'sans-serif'],
                // display: ['Lexend', 'sans-serif'],
            },
            colors: {
                // Opsional: Definisikan palet warna Anda di sini agar konsisten
                primary: {
                    DEFAULT: '#0ea5e9', // sky-500
                    '50': '#f0f9ff',
                    '100': '#e0f2fe',
                    '200': '#bae6fd',
                    '300': '#7dd3fc',
                    '400': '#38bdf8',
                    '500': '#0ea5e9',
                    '600': '#0284c7',
                    '700': '#0369a1',
                    '800': '#075985',
                    '900': '#0c4a6e',
                },
                accent: {
                    DEFAULT: '#ec4899', // pink-500
                    '500': '#ec4899',
                    '600': '#db2777',
                }
            },
            keyframes: {
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                },
            },
            animation: {
                blob: 'blob 7s infinite',
            },
            // -- AKHIR PENAMBAHAN --
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
        require('tailwind-scrollbar-hide'),
    ],
};