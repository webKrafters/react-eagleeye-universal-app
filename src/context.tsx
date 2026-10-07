import { createEagleEyeUniverse } from '@webkrafters/react-eagleeye';

export const getDemoInitState = () => ({
	color: 'Burgundy',
	customer: {
		name: {
			first: null as unknown as string,
			last: null as unknown as string
		},
		phone: null as unknown as string
	},
	price: 22.5,
	type: ''
});

export const defaultDemoState = getDemoInitState();

export type DemoState = typeof defaultDemoState;

export const DemoContext = createEagleEyeUniverse<DemoState>();

export const useDemoStream = DemoContext.useStream;
