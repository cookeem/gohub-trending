import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import axios from 'axios';

import '../css/style.css';
import ImageService from '../images/service-icon.png';
import Loading from './loading';

const Fab = React.lazy(() => import('./fab'));
const Card = React.lazy(() => import('./card'));

const FabLazy = () => (
  <>
    <Fab />
  </>
);

const CardLazy = () => (
  <>
    <Card />
  </>
);

const LazyRouterApp = () => (
  <HashRouter>
    <>
      <nav>
        <ul>
          <li>
            <Link to="/fab">Fab</Link>
          </li>
          <li>
            <Link to="/card">Card</Link>
          </li>
          <li>
            <Link to="/loading">Loading</Link>
          </li>
        </ul>
      </nav>
      <React.Suspense fallback={<div>Now loading...</div>}>
        <Switch>
          <Route exact path="/fab" component={FabLazy}/>
          <Route path="/card" component={CardLazy}/>
          <Route path="/loading" component={Loading}/>
          <Redirect to="/loading"/>
        </Switch>
      </React.Suspense>
    </>
  </HashRouter>
);

ReactDOM.render(<LazyRouterApp />, document.getElementById('lazy'));

const Index = () => {
  return <div>Hello React! 
      <div>
        <img src={ImageService}/>
      </div>
    </div>;
};

ReactDOM.render(<Index />, document.getElementById('index'));

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Zeng',
  lastName: 'Haijian'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('hello')
);

const PropsElm = (props) => {
  return (
    <h1>
      My name is: {props.name}
    </h1>
  )
}

ReactDOM.render(
  <PropsElm name="haijian"></PropsElm>, 
  document.getElementById('props_elm')
)

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

axios({
  url:'https://api.github.com/search/repositories?q=topic:kubernetes',
  method:'get',
  timeout: 5000
}).then(function (response) {
  response = checkStatus(response);
  console.log(response.data);
  console.log(response.headers);
}).catch(function (error) {
  console.log(error);
}).then(function () {
  // always executed
  console.log('success fetch github api!');
});  

/////////////////////////////////
// redux demo
/////////////////////////////////
//reducer
function counter(state = 0, action) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}
//store绑定到reducer
const store = createStore(counter);
//订阅store的变更事件
store.subscribe(() =>
	console.log("# store.state: ", store.getState())
);
//向store发送action改变state
const actionInc = { type: 'INCREMENT' };
const actionDec = { type: 'DECREMENT' };
console.log("# store.dispatch(actionInc)");
store.dispatch(actionInc);
console.log("# store.dispatch(actionDec)");
store.dispatch(actionDec);
console.log("# store.dispatch(actionInc)");
store.dispatch(actionInc);
