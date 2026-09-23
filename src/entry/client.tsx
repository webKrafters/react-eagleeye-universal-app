import {
	startTransition,
	StrictMode
} from 'react';

import { hydrateRoot } from 'react-dom/client';

import {
	createBrowserRouter,
	createContext,
	RouterContextProvider,
	RouterProvider
} from 'react-router';

import { getRoutes, LoaderData } from '../routes';
import { DemoContext, DemoState } from '../context';

const prehooks = {
	resetState: ( ...args : any[] ) => {
		console.log( 'prehook says: resetting state with >>>> ', JSON.stringify( args ) );
		return true;
	},
	setState: ( ...args : any[] ) => {
		console.log( 'prehook says: merging following into state >>>> ', JSON.stringify( args ) );
		return true;
	}
};

const __window = window as any;

const hydrationData = __window.__staticRouterHydrationData;

const { targetId } = DemoContext.provide({
	observableConfig: {
		prehooks,
		value: hydrationData.appState as DemoState
	}
});

__window.__staticRouterHydrationData.loaderData[ 0 ].appStoreId = targetId;

const appStoreId = createContext<LoaderData["appStoreId"]>();

const router = createBrowserRouter( getRoutes(
	new URLSearchParams( location.search ).get?.( 't' ) as "hoc"
), {
	getContext() {
		let context = new RouterContextProvider();
		context.set( appStoreId, targetId );
		return context;
	},
	hydrationData
} );

startTransition(() => {
	hydrateRoot(
		document.getElementById( 'root' )!,
		<StrictMode>
			<RouterProvider { ...{ router } } />
		</StrictMode>
	);
});
