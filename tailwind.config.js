/** Build: npm run css  (gera assets/tw.css) */
module.exports = {
  // A TV da sala roda Tizen 5.0 / Chromium 63, que NAO entende a sintaxe
  // rgb(r g b / a) usada pelo Tailwind em toda cor. Com estes plugins
  // desligados o Tailwind emite a cor crua (#f5ede0) em vez de
  // rgb(245 237 224/var(--tw-text-opacity)), que o Chromium 63 descarta.
  // Modificadores de opacidade (bg-white/10) continuam funcionando: viram
  // rgb(255 255 255/.1), com alfa estatico, e o lightningcss converte
  // esses para rgba() no passo seguinte do build.
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  content: [
    './index.html',
    './index-completo.html',
    './assessoria/*.html',
    './guia/*.html',
    './sobre/*.html',
    './contato/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        espresso: {
          950: '#0c0704', 900: '#160d07', 800: '#1f140c',
          700: '#2c1c10', 600: '#3d2716', 500: '#553c24',
        },
        gold: {
          200: '#ffe7b3', 300: '#ffd98a', 400: '#f6b94a',
          500: '#e89a2c', 600: '#cf7a1a', 700: '#a85f12',
        },
        ivory: { DEFAULT: '#f7f1e8', soft: '#efe6d8', deep: '#e6d8c4' },
      },
      letterSpacing: { tightest: '-0.04em' },
      boxShadow: {
        gold: '0 30px 80px -30px rgba(232,154,44,0.45)',
        soft: '0 40px 100px -40px rgba(0,0,0,0.7)',
        card: '0 24px 60px -24px rgba(0,0,0,0.55)',
      },
    },
  },
};
