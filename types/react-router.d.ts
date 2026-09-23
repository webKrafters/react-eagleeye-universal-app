import 'react-router';

import { LoaderData } from '../src/routes';

declare module 'react-router' {
	interface AppLoadContext extends Pick<LoaderData, "appStoreId">{}
}
