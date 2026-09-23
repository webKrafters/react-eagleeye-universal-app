import { FC } from 'react';
import { DemoContext, DemoState } from '../../context';

import Reset from '../Reset';
import { Store } from '@webkrafters/react-eagleeye';

const container = DemoContext.stream().into<{}>( Reset as FC<Store<DemoState>> );

export default container;
