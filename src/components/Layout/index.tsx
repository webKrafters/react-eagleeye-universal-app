
import {
	KeyboardEventHandler,
	useEffect,
	useRef,
	useState
} from 'react';

import {
	Link,
	Outlet,
	useLoaderData
} from 'react-router';

import {
	AddressUniverse as Address,
	Changes
} from '@webkrafters/react-eagleeye';

import {
	DemoContext,
	DemoState
} from '../../context';

import { LoaderData } from '../../routes';

import Logo from '../../wklogo-outline.png';

import './style.css';

const getNavItemProps = ( isCurrent : boolean ) => ({
	...isCurrent ? { className: 'current' } : {},
	rel: 'nofollow noreferrer',
	target: 'blank'
});

export function Layout() {

	const { appStoreId, demoType: type } = useLoaderData<LoaderData>();
	
	const demoContextAddr = useRef({} as Address<string> );

	const [{ targetId, demoType, observable }] = useState(() => ({
		targetId: appStoreId,
		demoType: type,
		observable: DemoContext.getObservableAt( appStoreId )
	}));

	const [ productType, setProductType ] = useState( 'Calculator' );

	useEffect(() => {
		console.log( 'on application mount >>> observer says: OUR EAGLE EYE DEMO STORE IS >>>>> ', observable );
		return observable.store.subscribe( 'data-updated', ( ...args ) => console.log(
			'on our Eagle Eye Demo store update >>> observer says: UPDATED THE STORE WITH THE FOLLOWING ARGS >>>>> ',
			...args
		) );
	}, []);

	const updateType : KeyboardEventHandler<HTMLInputElement> = e => setProductType(( e.target as HTMLInputElement ).value );

	const year = new Date().getFullYear();

	useEffect(() => console.log(
		'on application state update >>> observer says: OUR EAGLE EYE DEMO STORE IS >>>>> ',
		observable
	));

	useEffect(() => {
		const t = setTimeout( () => observable.store.setState(
			{ type: productType } as Changes<DemoState> ),
			1000
		);
		return () => clearTimeout( t );
	}, [ productType ]);

	useEffect(() => observable.store.subscribe(
		'data-updated',
		( a, b, c ) => 'type' in c && setProductType( c[ 'type' ] as string )
	), []);
	
	return (
		<div className="App">
			<div>
				<h1>
					<img src={ Logo } alt="wk logo" />
					<p>
						<strong>{ '<' }<span>universal</span>{ ' />' } </strong> <span>@webkrafters/react-eagleeye demo</span>
						<a
							href="https://www.npmjs.com/package/@webkrafters/react-eagleeye"
							rel="no-follow"
						>
							Eagle Eye
						</a>
					</p>
				</h1>
				<nav>
					<label>App types:</label>
					<a href='/' { ...getNavItemProps( demoType === '' ) }>usecontext</a>
					<a href='?t=memo' { ...getNavItemProps( demoType === 'memo' ) }>memo(usecontext)</a>
					<a href='?t=hoc' { ...getNavItemProps( demoType === 'hoc' ) }>connect <i>(recommended)</i></a>
				</nav>
				<main>
					<h1>{ demoType }{ ( demoType ?? '' ).length ? ' d' : 'D' }emo</h1>
					<h2>A contrived product app.</h2>
					<nav>
						<Link to='/'>Home</Link>
						<Link to='/about'>About</Link>
					</nav>
					<div style={{ marginBottom: 10 }}>
						<label>
							Type:{ ' ' }
							<input
								onKeyUp={ updateType }
								placeholder="override product type here..."
							/>
						</label>
					</div>
					<DemoContext.Provider { ...{ targetId, ref: demoContextAddr } }>
						<Outlet context={ demoContextAddr.current } />
					</DemoContext.Provider>
				</main>
			</div>
			<footer>
				&copy;2022{ year > 2022 ? `-${ year }` : '' } <a href="https://webkrafters.tech" rel="no-follow">webKrafters</a>. All rights reserved.
			</footer>
		</div>
	);
}
