import React, { FC, useEffect } from 'react';

interface Props { data : { p : number } }

const PriceSticker : FC<Props> = ({ data: { p } }) => {
	useEffect(() => console.log( 'PriceSticker component rendered.....' ));
	return (
		<div style={{ fontSize: 36, fontWeight: 800 }}>
			${ p.toFixed( 2 ) }
		</div>
	);

};

PriceSticker.displayName = 'PriceSticker';

export default PriceSticker;
