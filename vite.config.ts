/// <reference types="vite/client" />

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Remove the base path for Vercel deployment
  // base: '/digital-library/',
});