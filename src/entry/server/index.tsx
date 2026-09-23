import express from 'express';

import { StrictMode } from 'react';

import { renderToString } from 'react-dom/server';

import { 
	createStaticHandler, 
	createStaticRouter,
	StaticRouterProvider 
} from 'react-router';

import { FULL_STATE_SELECTOR } from '@webkrafters/react-eagleeye';

import { DemoContext, getDemoInitState } from '../../context';

import { getRoutes } from '../../routes';

export async function render( request : express.Request ) {
	const origReqUrl = request.url;
	try {
		request.url = `${ request.protocol }://${ request.get( 'host' )}${ request.originalUrl }`;
		const handler = createStaticHandler( getRoutes(
			new URL( request.url ).searchParams.get?.( 't' ) as 'hoc'
		) );
		const {
			target: observable,
			targetId: appStoreId
		} = DemoContext.provide({
			observableConfig: {
				value: getDemoInitState()
			}
		});
		const context = await handler.query(
			request as unknown as Request,
			{ requestContext: { appStoreId } }
		);
		if( context instanceof Response ) { throw context };
		const router = createStaticRouter( handler.dataRoutes, context );
		const html = renderToString(
			<StrictMode>
				<StaticRouterProvider { ...{ router, context } } />
			</StrictMode>
		);
		return {
			html,
			hydrationScript: `window.__staticRouterHydrationData = ${
				JSON.stringify({
					actionData: context.actionData,
					appState: observable.store.getState([ FULL_STATE_SELECTOR ]),
					errors: context.errors,
					loaderData: context.loaderData
				})
			};`
		};
	} finally {
		request.url = origReqUrl;
	}
}
