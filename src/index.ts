import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import express from 'express';
import { createServer, ViteDevServer } from 'vite';

export type ViewArtifacts = [
	template : string,
	vModel : {
		html : string;
		hydrationScript : string;
	}
];

const readFile = promisify( fs.readFile );

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const isDev = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3000;

( async () => {
	const app = express();
	let vite: ViteDevServer;
	if( !isDev ) {
		app.use( express.static( path.resolve( __dirname, 'dist/client' ) ) );
	} else {
		vite = await createServer({
			appType: 'custom',
			server: {
				middlewareMode: true
			},
		});
		app.use( vite.middlewares );
	};
	app.get( '/.well-known/appspecific/com.chrome.devtools.json', ( req, res ) => {
		res.status( 404 ).json({
			message: 'Not supported. Feel free to implement it if you so desire.'
		});
	});
	app.all( /(.*)/, async ( req, res ) => {
		try {
			let [ template, vModel ] : ViewArtifacts = await Promise.all(
				!isDev ? [
					readFile( path.resolve( __dirname, 'dist/client/index.html' ), 'utf-8' ),
					( async() => {
						const m = await import( path.resolve(
							__dirname, 'dist/server/index.js'
						) as any );
						return await m.render( req );
					} )()
				] : [
					vite.transformIndexHtml( req.originalUrl, fs.readFileSync(
						path.resolve( __dirname, '..', 'index.html' ), 'utf-8'
					) ),
					( async() => {
						const m = await vite.ssrLoadModule( path.resolve(
							__dirname, 'entry/server/index.tsx'
						) );
						return await m.render( req );
					} )()
				]
			);
			template = template.replace( '<!--ssr-hydration-->', vModel.hydrationScript );
			template = template.replace( '<!--ssr-outlet-->', vModel.html );
			res.status( 200 ).set({ 'Content-Type': 'text/html' }).end( template );
		} catch( e: any ) {
			if( e instanceof Response ) {
				return res.redirect( e.status, e.headers.get( 'Location' ) || '/' );
			}
			res.status( 500 );
			if ( !isDev ) {
				res.end( 'Internal Server Render Error' );
				return;
			}
			vite.ssrFixStacktrace( e );
			console.info( 'ERROR >>>>> ', e );
			res.end( e.message );
		}
	} ).listen( PORT, () => console.log( `React Eagle Eye Demo Universal app running on port: ${ PORT }` ) );
} )();
