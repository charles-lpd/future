import {defineConfig} from 'vite'
import {loadEnv} from "vite";
import react from '@vitejs/plugin-react'
// yarn add --dev @esbuild-plugins/node-globals-polyfill
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill'
// yarn add --dev @esbuild-plugins/node-modules-polyfill
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill'
// You don't need to add this to deps, it's included by @esbuild-plugins/node-modules-polyfill
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import nodeResolve from '@rollup/plugin-node-resolve'
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd())

    const processEnvValues = {
        'process.env': Object.entries(env).reduce(
            (prev, [key, val]) => {
                return {
                    ...prev,
                    [key]: val,
                }
            },
            {},
        )
    }

    return {
        plugins: [
          react(),
        ],
        // https://github.com/vitejs/vite/issues/1930
        // https://vitejs.dev/guide/env-and-mode.html#env-files
        // 在这里自定义变量
        define: Object.assign(processEnvValues, {}),
        resolve: {
            alias: {
                buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6', // add buffer
                process: 'rollup-plugin-node-polyfills/polyfills/process-es6', // add process
            },
        },
        optimizeDeps: {
            esbuildOptions: {
                // Node.js global to browser globalThis
                define: {
                    global: 'globalThis'
                },
                // Enable esbuild polyfill plugins
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true
                    }),
                    NodeModulesPolyfillPlugin()
                ]
            }
        },
        build: {
            // 不压缩，用于调试
            minify: false,
            rollupOptions: {
                plugins: [
                    // Enable rollup polyfills plugin
                    // used during production bundling
                    rollupNodePolyFill(),
                    nodeResolve()
                ]
            }
        }
    }
})
