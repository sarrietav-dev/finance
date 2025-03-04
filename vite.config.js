import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        AutoImport({
            dts: true,
            resolvers: [
                IconsResolver({
                    prefix: 'Icon',
                    extension: 'jsx',
                }),
            ],
        }),
        Icons({
            compiler: 'jsx', // or 'solid'
            jsx: 'react',
        }),
    ],
});
