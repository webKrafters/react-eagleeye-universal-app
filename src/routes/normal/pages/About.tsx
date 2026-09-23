import { FC } from 'react';

import { useDemoStream } from '../../../context';

import ProductDescription from '../../../components/with-context/ProductDescription';
import Reset from '../../../components/with-context/Reset';

const Detail : FC = () => {

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

};

Detail.displayName = 'Detail';

export default Detail;
