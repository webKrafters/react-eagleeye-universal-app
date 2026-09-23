import { FC } from 'react';
import { DemoContext } from '../../context';

import TallyDisplay from '../TallyDisplay';

const container = DemoContext
	.stream({
		color: 'color',
		name: 'customer.name',
		price: 'price',
		type: 'type'
	} as const )
		.into<{
			PhoneDisplay : FC,
			Resetter : FC
		}>( TallyDisplay );

export default container;
