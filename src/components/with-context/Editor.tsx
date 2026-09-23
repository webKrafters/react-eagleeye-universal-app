import React, { useEffect, useRef } from 'react';

import { DemoState, useDemoStream } from '../../context';
import { Changes } from '@webkrafters/react-eagleeye';

const Editor = () => {

	const { setState } = useDemoStream()

	const fNameInputRef = useRef<HTMLInputElement>( null );
	const lNameInputRef = useRef<HTMLInputElement>( null );
	const phoneInputRef = useRef<HTMLInputElement>( null );
	const priceInputRef = useRef<HTMLInputElement>( null );
	const colorInputRef = useRef<HTMLInputElement>( null );
	const typeInputRef = useRef<HTMLInputElement>( null );

	const updateColor = () => setState({
		color: colorInputRef.current!.value
	} as Changes<DemoState> );
	const updateName = () => setState({
		customer: {
			name: {
				first: fNameInputRef.current!.value,
				last: lNameInputRef.current!.value
			}
		}
	});
	const updatePhone = () => {
		let phone = phoneInputRef.current!.value;
		if( phone.length && !/[0-9]{10}/.test( phone ) ) { return }
		phone = phone.replace( /(.{3})/, '$1-' ).replace( /(.{7})/, '$1-' );
		setState({ customer: { phone } } as Changes<DemoState> );
	};
	const updatePrice = () => setState({
		price: Number( priceInputRef.current!.value )
	} as Changes<DemoState>);
	const updateType = () => setState({
		type: typeInputRef.current!.value
	} as Changes<DemoState> );

	useEffect(() => console.log( 'Editor component rendered.....' ));

	return (
		<fieldset style={{ margin: '10px 0' }}>
			<legend>Editor</legend>
			<h3 style={{ margin: '0.5rem 0' }}>Customer:</h3>
			<div style={{ float: 'left', margin: '10px 0' }}>
				<label htmlFor='firstName'><input ref={ fNameInputRef } placeholder="First name" /></label>
				{ ' ' }
				<label htmlFor='lastName'><input ref={ lNameInputRef } placeholder="Last name" /></label>
				{ ' ' }
				<button onClick={ updateName }>update customer</button>
			</div>
			<div style={{ clear: 'both', margin: '10px 0' }}>
				<label>New Phone: <input
					maxLength={ 10 }
					placeholder="Empty or 10-digit integer"
					ref={ phoneInputRef }
				/></label>
				{ ' ' }
				<button onClick={ updatePhone }>update phone</button>
			</div>
			<hr style={{ margin: '1.5rem -0.85rem' }} />
			<div style={{ margin: '10px 0' }}>
				<label>New Price: <input ref={ priceInputRef } /></label>
				{ ' ' }
				<button onClick={ updatePrice }>update price</button>
			</div>
			<div style={{ margin: '10px 0' }}>
				<label>New Color: <input ref={ colorInputRef } /></label>
				{ ' ' }
				<button onClick={ updateColor }>update color</button>
			</div>
			<div style={{ margin: '10px 0' }}>
				<label>New Type: <input ref={ typeInputRef } /></label>
				{ ' ' }
				<button onClick={ updateType }>update type</button>
			</div>
		</fieldset>
	);

};

Editor.displayName = 'Editor';

export default Editor;
