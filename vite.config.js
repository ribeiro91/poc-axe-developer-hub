import path from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import viteRestart from 'vite-plugin-restart';

function generateId(name = '') {
  return `${Math.floor(Math.random() * 10000 + 1)}_${name.replace(/ /g, '-')}`;
}
function ifEquals(arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
}

function isDefined(value) {
  return value !== undefined;
}

function resourcesPath(value = '') {
  return '/src/globals/css/resources';
}

function loopOver(collection) {
  const newCollection = collection
    .replace(/\n/g, '')
    .replace(/\r/g, '')
    .replace(/\t/g, '');
  return JSON.parse(newCollection);
}

export default defineConfig({
  root: './',
  publicDir: 'public',
  server: {
    port: 5050,
    open: false,
    host: 'localhost',
  },
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src/components'),
      helpers: {
        dynamicId: (name) => generateId(name),
        loop: (collection) => loopOver(collection),
        ifEquals: (arg1, arg2, options) => ifEquals(arg1, arg2, options),
        isDefined: (value) => isDefined(value),
        resourcesPath: (value) => resourcesPath(value),
      },
    }),
    // viteRestart({
    //   restart: [
    //     // enable if trouble with reloads
    //     'src/components/**/*.html',
    //     'src/components/**/*.js',
    //     'src/templates/**/*.html',
    //     'src/templates/**/*.js',
    //   ],
    // }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Added code splitting optimization
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
    target: 'es2020',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
});
