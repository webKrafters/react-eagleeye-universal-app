import {
	FC,
	KeyboardEventHandler,
	useMemo
} from 'react';

import { useOutletContext } from 'react-router';

import { AddressUniversal as Address, Changes } from '@webkrafters/react-eagleeye';

import { DemoContext, DemoState } from '../../../context';

import Editor from '../../../components/with-context/Editor';
import PriceSticker from '../../../components/with-context/PriceSticker';
import ProductDescription from '../../../components/with-context/ProductDescription';
import TallyDisplay from '../../../components/with-context/TallyDisplay';

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
				<TallyDisplay />
			</div>
			<ProductDescription />
			<PriceSticker />
		</div>
	);

};

Product.displayName = 'Product';

export default Product;
