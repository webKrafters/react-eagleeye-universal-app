import React, { useEffect } from 'react';

import { useDemoStream } from '../../context';

const PriceSticker = () => {
	const { data: { p } } = useDemoStream({ p: 'price' } as const );
	useEffect(() => console.log( 'PriceSticker component rendered.....' ));
	return (
		<div style={{ fontSize: 36, fontWeight: 800 }}>
			${ p.toFixed( 2 ) }
		</div>
	);
};

PriceSticker.displayName = 'PriceSticker';

export default PriceSticker;
