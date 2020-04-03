import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const entries = [
  'src/background.ts',
  'src/runtime.ts',
]

export default args => (
  entries.map(entry => {
    /** @type {import('rollup').RollupOptions} */
    const config = {
      input: entry,
      output: {
        dir: 'dist',
        format: 'iife',
      },
      plugins: [
        resolve({
          extensions: ['.ts', '.js', '.json'],
        }),
        commonjs(),
        typescript(),
        !args.watch && terser(),
        copy({
          targets: [
            {
              src: ['src/**/*', '!**/*.ts'],
              dest: 'dist',
            },
          ],
        }),
      ].filter(Boolean),
    }
    return config
  })
)
