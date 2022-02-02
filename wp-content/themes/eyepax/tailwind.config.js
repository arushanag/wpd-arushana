module.exports = {
    theme: {

        extend: {
            screens: {
                xxl: '1500px',
                lg: '1024px',
                md: '768px',
                sm: '640px',
            },
            colors: {
                'brand-orange': '#F2A835',
                'brand-blue': '#285B7B',
                'brand-pink': '#EC008C',
                'brand-green': '#00843D',
                'brand-orange': '#E17800',
                'brand-purple': '#7B0567',
                'brand-border': '#ECECEA',
                'brand-gray': '#ececeb',
            },
            fontFamily: {
                heading: 'Roboto Slab',
                text: 'Roboto Slab',
            },
            spacing: {
                'section': '6rem',
            },
            container: {
                padding: '30px',
            },
        }
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active']
    },
    plugins: []
}