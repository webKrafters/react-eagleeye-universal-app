import React, { FC, useEffect } from 'react';

import isEmpty from 'lodash.isempty';

import { useDemoStream } from '../../context';

import CapitalizedDisplay from '../CapitalizedDisplay';

import CustomerPhoneDisplay from './CustomerPhoneDisplay';

import Reset from './Reset';

const TallyDisplay : FC<{
	PhoneDisplay? : FC;
	Resetter? : FC;
}> = ({
	PhoneDisplay = CustomerPhoneDisplay,
	Resetter = Reset
}) => {

	const { data: { color, name, price, type } } = useDemoStream({
		color: 'color',
		name: 'customer.name',
		price: 'price',
		type: 'type'
	} as const );

	useEffect(() => console.log( 'TallyDisplay component rendered.....' ));

	useEffect(() => {
		console.info( '<<<'.repeat( 4 ) + ' HELLO ' + '>>>'.repeat( 4 ) );
		return () => {
			console.info( '<<<'.repeat( 4 ) + ' BYE BYE ' + '>>>'.repeat( 4 ) );
		}
	}, []);

	return (
		<div style={{ margin: '20px 0 10px' }}>
			<div style={{ float: 'left', fontSize: '1.75rem' }}>
				Customer:
				{ ' ' }
				{ isEmpty( name.first ) && isEmpty( name.last )
					? 'n.a.'
					: (
						<>
							<CapitalizedDisplay text={ name.first } />
							{ ' ' }
							<CapitalizedDisplay text={ name.last } />
						</>
					)
				}
			</div>
			<div style={{ clear: 'both', paddingLeft: 3 }}>
				<PhoneDisplay />
			</div>
			<table>
				<tbody>
					<tr><td><label>Type:</label></td><td>
						<CapitalizedDisplay text={ type } />
					</td></tr>
					<tr><td><label>Color:</label></td><td>
						<CapitalizedDisplay text={ color } />
					</td></tr>
					<tr><td><label>Price:</label></td><td>{ price.toFixed( 2 ) }</td></tr>
				</tbody>
			</table>
			<div style={{ textAlign: 'right' }}>
				<Resetter />
			</div>
		</div>
	);

};

TallyDisplay.displayName = 'TallyDisplay';

export default TallyDisplay;
