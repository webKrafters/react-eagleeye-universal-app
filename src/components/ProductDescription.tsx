import React, { FC, useEffect } from 'react';

interface Props { data: { c : string; t : string; } }

const ProductDescription : FC<Props> = ({ data: { c, t } }) => {
	useEffect(() => console.log( 'ProductDescription component rendered.....' ));
	return (
		<div style={{ fontSize: 24 }}>
			<strong>Description:</strong> { c } { t }
		</div>
	);
};

ProductDescription.displayName = 'ProductDescription';

export default ProductDescription;
