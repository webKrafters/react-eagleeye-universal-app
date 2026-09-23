import { DemoContext } from '../../context';

import CustomerPhone from '../CustomerPhoneDisplay';

const CustomerPhoneDisplay = DemoContext
	.stream({ phone: 'customer.phone' } as const )
		.into<{}>( CustomerPhone );

export default CustomerPhoneDisplay;
