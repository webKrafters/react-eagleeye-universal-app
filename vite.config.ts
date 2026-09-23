import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => ({
	build: process.env.BUILD_TARGET === 'server' ? {
		outDir: 'dist/server',
		rollupOptions: {
			input: resolve( import.meta.dirname, 'src/index.ts' ), 
			output: {
				format: 'esm',
				entryFileNames: 'index.js',
			},
		},
		ssr: true,
		target: 'node18'
	} : {
		manifest: true,
		outDir: 'dist/client',
		rollupOptions: {
			input: resolve( import.meta.dirname, 'index.html' ),
		}
	},
	plugins: [ react(), {
    	name: 'intercept-favicon-late',
    	configureServer( server ) {
			// Returning a function ensures this runs AFTER internal Vite middlewares
			return () => {
				server.middlewares.use(( req, res, next ) => {
					if( req.url === '/favicon.ico' ) {
						res.statusCode = 200;
						res.setHeader( 'Content-Type', 'image/x-icon' );
						res.end( '' );
						return;
					}
					next();
				});
			};
    	}
    } ],
	ssr: {
		noExternal: mode === 'production' ? [/./] : []
	},
}));
