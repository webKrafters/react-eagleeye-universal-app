import {
	FC,
	KeyboardEventHandler,
	useMemo
} from 'react';

import { AddressUniversal as Address, Changes } from '@webkrafters/react-eagleeye';

import { DemoContext, DemoState } from '../../../context';

import CustomerPhone from '../../../components/containers/CustomerPhoneDisplay';
import Editor from '../../../components/containers/Editor';
import PriceSticker from '../../../components/containers/PriceSticker';
import ProductDescription from '../../../components/containers/ProductDescription';
import Reset from '../../../components/containers/Reset';
import TallyDisplay from '../../../components/containers/TallyDisplay';
import { useOutletContext } from 'react-router';

const Product : FC = () => {

	const { targetId } = useOutletContext<Address<string>>();
	
	const overridePricing = useMemo(() => {
		const observable = DemoContext.getObservableAt( targetId );
		const handler : KeyboardEventHandler<HTMLInputElement> = e => (
			observable.store.setState({
				price: Number(( e.target as HTMLInputElement ).value )
			} as Changes<DemoState>)
		);
		return handler;
	}, []);

	return (
		<div>
			<div style={{ marginBottom: 10 }}>
				<label>$ <input onKeyUp={ overridePricing } placeholder="override price here..." /></label>
			</div>
			<div style={{
				borderBottom: '1px solid #333',
				marginBottom: 10,
				paddingBottom: 5
			}}>
				<Editor />
				<TallyDisplay
					PhoneDisplay={ CustomerPhone }
					Resetter={ Reset }
				/>
			</div>
			<ProductDescription />
			<PriceSticker />
		</div>
	);

};

Product.displayName = 'Product';

export default Product;
