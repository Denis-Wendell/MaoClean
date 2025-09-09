import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Importa o módulo 'path' do Node.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configuração para o deploy no GitHub Pages
  base: '/MaoClean/', // Nome exato do seu repositório
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },

  // Configuração para o servidor de desenvolvimento local
  server: {
    fs: {
      // Permite servir ficheiros de um nível acima do root do projeto (ex: node_modules)
      allow: [
        // Procura no diretório de trabalho atual e permite um nível acima
        path.resolve(__dirname, '..'),
      ],
    },
  },
});

