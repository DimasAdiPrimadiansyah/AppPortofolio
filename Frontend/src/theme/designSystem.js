export const designSystem = {
    colors: {
        primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554'
        },
        accent: {
            50: '#fdf4ff',
            100: '#fae8ff',
            200: '#f5d0fe',
            300: '#f0abfc',
            400: '#e879f9',
            500: '#d946ef',
            600: '#c026d3',
            700: '#a21caf',
            800: '#86198f',
            900: '#701a75',
            950: '#4a044e'
        },
        neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
            950: '#0a0a0a'
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#06b6d4'
    },
    typography: {
        fontFamily: {
            display: ['Inter', 'system-ui', 'sans-serif'],
            body: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'Consolas', 'monospace']
        }
    },
    animation: {
        duration: {
            fast: '0.15s',
            normal: '0.3s',
            slow: '0.5s'
        },
        easing: {
            default: 'cubic-bezier(0.4, 0, 0.2, 1)',
            smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    }
};

export const animations = {
    fadeUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    },
    slideLeft: {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 }
    },
    slideRight: {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 }
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    },
    stagger: {
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }
};
