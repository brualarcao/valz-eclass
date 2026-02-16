import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#26F0A1',
          secondary: '#1A9E6B',
          dark: '#0A0A0A',
          surface: '#141414',
          border: '#27272A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
        }
      },
      backgroundImage: {
        'valz-gradient': 'linear-gradient(135deg, #26F0A1 0%, #1A9E6B 100%)',
      }
    }
  }
}