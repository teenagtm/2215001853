// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
//   server: {
//     port: 3000, // Set port to 3000 as required
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 👈 This sets the Vite dev server to run on localhost:3000
    proxy: {
      '/api': {
        target: 'http://20.244.56.144',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/evaluation-service'),
      }
    }
  }
});
