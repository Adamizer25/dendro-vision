/* @refresh reload */
import { render } from 'solid-js/web';

import './index.scss';
import App from './App';
// import App2 from './Two-Panel';

render(() => <App />, document.getElementById('root') as any);
