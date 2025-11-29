import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      index: 'src/core/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: false,
    outDir: 'dist',
  },
  {
    entry: {
      index: 'src/react/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    treeshake: true,
    minify: false,
    outDir: 'dist/react',
    external: ['react', 'react-dom'],
  },
  {
    entry: {
      index: 'src/vue/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    treeshake: true,
    minify: false,
    outDir: 'dist/vue',
    external: ['vue'],
  },
])
