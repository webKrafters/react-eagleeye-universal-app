import { FC, memo } from 'react';

import { useDemoStream } from '../../../context';

import ProductDescription from '../../../components/memoized/ProductDescription';
import Reset from '../../../components/memoized/Reset';

const Detail = memo<FC>(() => {

	const { data: { type } } = useDemoStream({ type : 'type' });

	return (
		<div>
			<h1>A bit about { type ?? 'n.a.'}</h1>
			<ProductDescription />
			<div style={{ marginTop: '2rem' }}>
				<Reset /> entirely from here!
			</div>
		</div>
	);

});

Detail.displayName = 'Detail';

export default Detail;
