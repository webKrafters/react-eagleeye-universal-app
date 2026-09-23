import { DemoContext } from '../../context';

import PriceSticker from '../PriceSticker';

const container = DemoContext
	.stream({ p: 'price' } as const )
		.into<{}>( PriceSticker );

export default container;
