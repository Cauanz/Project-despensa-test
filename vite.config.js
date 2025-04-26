import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import eslintPlugin from 'vite-plugin-eslint'
// import fs from 'fs';
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }), 
    mkcert()
  ],
  // server: {
  //   https: true
  // }
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, "localhost+1-key.pem")),
  //     cert: fs.readFileSync(path.resolve(__dirname, "localhost+1.pem")),
  //   }
  // }
})
