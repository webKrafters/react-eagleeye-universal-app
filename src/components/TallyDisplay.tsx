import React, { FC, useEffect } from 'react';

import isEmpty from 'lodash.isempty';

import { DemoState } from '../context';

import CapitalizedDisplay from './CapitalizedDisplay';

export interface Props {
	data : {
		color : string;
		name : DemoState["customer"]["name"];
		price : number;
		type : string;
	};
	PhoneDisplay : FC,
	Resetter : FC
}

const TallyDisplay : FC<Props> = ({
	data: { color, name, price, type },
	PhoneDisplay,
	Resetter
}) => {
	useEffect(() => console.log( 'TallyDisplay component rendered.....' ));
	return (
		<div style={{ margin: '20px 0 10px' }}>
			<div style={{ float: 'left', fontSize: '1.75rem' }}>
				Customer:
				{ ' ' }
				{ isEmpty( name.first ) && isEmpty( name.last ) ? 'n.a.' : (
					<>
						<CapitalizedDisplay text={ name.first } />
						{ ' ' }
						<CapitalizedDisplay text={ name.last } />
					</>
				) }
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
