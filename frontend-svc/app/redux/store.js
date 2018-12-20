import { createStore } from 'redux';
import { reducerRoot }  from './reducer' ;

export const store=createStore(reducerRoot);

store.subscribe(() => {
  // console.log("# store.state: ", store.getState())
});
