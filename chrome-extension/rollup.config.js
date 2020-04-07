import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const entries = [
  'src/background.ts',
  'src/runtime.ts',
  'src/adapter.ts',
]

const dest = 'yapi-x-chrome-extension'

export default args => (
  entries.map(entry => {
    /** @type {import('rollup').RollupOptions} */
    const config = {
      input: entry,
      output: {
        dir: dest,
        format: 'umd',
      },
      treeshake: {
        moduleSideEffects: false,
        unknownGlobalSideEffects: false,
      },
      plugins: [
        resolve({
          extensions: ['.ts', '.js', '.json'],
        }),
        commonjs(),
        typescript({
          check: false,
        }),
        !args.watch && terser(),
        copy({
          targets: [
            {
              src: ['src/**/*', '!**/*.ts'],
              dest: dest,
            },
          ],
        }),
      ].filter(Boolean),
    }
    return config
  })
)
