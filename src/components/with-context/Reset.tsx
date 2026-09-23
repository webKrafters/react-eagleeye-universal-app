import React from 'react';

import { useDemoStream } from '../../context';

const Reset = () => {
	const  { resetState } = useDemoStream();
	const reset = () => resetState([ '@@STATE' ]);
	return ( <button className="reset" onClick={ reset }>reset context</button> );
};

Reset.displayName = 'Reset';

export default Reset;
