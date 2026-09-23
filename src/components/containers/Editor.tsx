import { FC } from 'react';
import { DemoContext, DemoState } from '../../context';

import Editor from '../Editor';
import { Store } from '@webkrafters/react-eagleeye';

const container = DemoContext.stream().into<{}>( Editor as FC<Store<DemoState>> );

export default container;
