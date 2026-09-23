import { DemoContext } from '../../context';

import ProductDescription from '../ProductDescription';

const container = DemoContext
	.stream({ c: 'color', t: 'type' } as const )
		.into<{}>( ProductDescription );

export default container;
