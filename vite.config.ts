import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from "@vitejs/plugin-basic-ssl"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'script',

            pwaAssets: {
                disabled: true,
                config: false,
            },

            manifest: false,

            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
            },

            devOptions: {
                enabled: false,
                navigateFallback: 'index.html',
                suppressWarnings: true,
                type: 'module',
            },
        }),
        basicSsl()
    ],
    server: {
        // @ts-ignore
        https: true,
        host: true,
    },
})