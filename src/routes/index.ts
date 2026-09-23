import type { RouteObject } from 'react-router';

import { Layout } from '../components/Layout';

import { routes as hocRoutes } from './hoc';
import { routes as memoRoutes } from './memo';
import { routes } from './normal';

export interface LoaderData {
	appStoreId : string;
	demoType : "hoc"|"memo"|"";
}

export function getRoutes( demoType? : 'hoc' ) : Array<RouteObject>;
export function getRoutes( demoType? : 'memo' ) : Array<RouteObject>;
export function getRoutes( demoType? : any ) : Array<RouteObject> {
	return [{
		children: whichRoutes( demoType ),
		Component: Layout,
		loader: ({ context }) => ({
			appStoreId: context.appStoreId,
			demoType
		} as LoaderData ),
		path: '/'
	}];
}

function whichRoutes( demoType? : string ) {
	switch( demoType ) {
		case 'hoc': return hocRoutes;
		case 'memo': return memoRoutes;
		default: return routes;
	}
}
