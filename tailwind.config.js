/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        epolia: {
          orange: '#FF661A',
          cream: '#F3E8CC',
          lime: '#C3E841',
          lilac: '#A592D4',
          purple: '#58126A',
          background: '#F8F4EB',
          text: '#1A1A1A',
          muted: '#7A7A7A',
          ink: '#1A1A1A'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(88, 18, 106, 0.12)'
      }
    }
  },
  plugins: []
}
