import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';

import '../css/style.css';
import ImageService from '../images/service-icon.png';
import Loading from './loading';

/////////////////////////////////
// react redux demo
/////////////////////////////////

//reducer
function reducerCounter(state = 0, action) {
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
const storeCounter = createStore(reducerCounter);

//订阅store的变更事件
storeCounter.subscribe(() =>
	console.log("# storeCounter.state: ", storeCounter.getState())
);

//向store发送action改变state
const actionCounterInc = { type: 'INCREMENT' };
const actionCounterDec = { type: 'DECREMENT' };
console.log("# storeCounter.dispatch(actionInc)");
storeCounter.dispatch(actionCounterInc);
console.log("# storeCounter.dispatch(actionDec)");
storeCounter.dispatch(actionCounterDec);

//把redux的state输出到component的props
const mapStateCounter = (state) => {
  return {
    counterResult: state
  }
}

//把component的事件映射到dispatch，可以返回一系列函数
const mapDispatchCounter = (dispatch) => {
  return {
    onClickIncrement: (e) => {
      e.preventDefault();
      dispatch(actionCounterInc);
    },
    onClickDecrement: (e) => {
      e.preventDefault();
      dispatch(actionCounterDec);
    }
  }
}

const Counter = (props) => {
  return (
    <div>
      <ul>
        <li>
          <a onClick={props.onClickIncrement} href="#">+1</a>
        </li>
        <li>
          <a onClick={props.onClickDecrement} href="#">-1</a>
        </li>
      </ul>
      counter result is: {props.counterResult}
    </div>
  )
}
const CounterRedux = connect(mapStateCounter, mapDispatchCounter)(Counter)

const ReduxApp = (
  <Provider store={storeCounter}>
    <CounterRedux></CounterRedux>
  </Provider>
);


ReactDOM.render(ReduxApp, document.getElementById('redux'));

/////////////////////////
// lazy import
/////////////////////////
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

export default class ExampleProps extends Component {
  render() {
    return (
      <div>
        props name is: {this.props.name}
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleProps name="example-props"></ExampleProps>,
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

