import { FC } from 'react';

import { DemoContext } from '../../../context';

import ProductDescription from '../../../components/containers/ProductDescription';
import Reset from '../../../components/containers/Reset';

const Detail = DemoContext
	.stream({ type : 'type' })
	.into<{}>(({ data: { type }}) => (
		<div>
			<h1>A bit about { type ?? 'n.a.'}</h1>
			<ProductDescription />
			<div style={{ marginTop: '2rem' }}>
				<Reset /> entirely from here!
			</div>
		</div>
	));

Detail.displayName = 'Detail';

export default Detail;

