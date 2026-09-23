import type { RouteObject } from 'react-router';
import Home from './pages/Index';
import About from './pages/About';

export const routes : Array<RouteObject> = [{
	index: true,
	Component: Home
}, {
	path: 'about',
	Component: About
}];
