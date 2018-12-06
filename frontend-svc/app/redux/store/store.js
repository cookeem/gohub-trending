import { createStore } from 'redux';
import { reducerRoot }  from '../reducer/reducer' ;

export const store=createStore(reducerRoot);

store.subscribe(() =>
	console.log("# store.state: ", store.getState())
);
