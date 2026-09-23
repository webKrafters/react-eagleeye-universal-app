import React, { useEffect } from 'react';

import { useDemoStream } from '../../context';

const ProductDescription = () => {
	const { data: { c, t } } = useDemoStream({ c: 'color', t: 'type' } as const );
	useEffect(() => console.log( 'ProductDescription component rendered.....' ));
	return (
		<div style={{ fontSize: 24 }}>
			<strong>Description:</strong> { c } { t }
		</div>
	);
};

ProductDescription.displayName = 'ProductDescription';

export default ProductDescription;
