import React, { FC, useEffect } from 'react';

interface Props { data : { phone : string } }

const CustomerPhoneDisplay : FC<Props> = ({ data }) => {
	useEffect(() => console.log( 'CustomerPhoneDisplay component rendered.....' ));
	return `Phone: ${ data.phone ?? 'n.a.' }`;
};
CustomerPhoneDisplay.displayName = 'CustomerPhoneDisplay';

export default CustomerPhoneDisplay;
