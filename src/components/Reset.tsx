import React, { FC, useEffect } from 'react';

import { Store } from '@webkrafters/react-eagleeye';

const Reset : FC<Store> = ({ resetState }) => {
	useEffect(() => console.log( 'Reset component rendered.....' ));
	const reset = () => resetState([ '@@STATE' ]);
	return ( <button className="reset" onClick={ reset }>reset context</button> );
};

Reset.displayName = 'Reset';

export default Reset;
