import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import fs from 'fs';
// import path from 'path';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true
  }
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, "localhost+1-key.pem")),
  //     cert: fs.readFileSync(path.resolve(__dirname, "localhost+1.pem")),
  //   }
  // }
})
