import { build } from 'esbuild'
import { resolve } from 'node:path'

await build({
  entryPoints: ['src/client/client.mts'],
  outfile: 'dist/client.mjs',
  format: 'esm',
  bundle: true,
  minify: true,
  define: { 'process.env.NODE_ENV': '"development"' },
  sourcemap: true
})