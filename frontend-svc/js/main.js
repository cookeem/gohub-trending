import React from 'react';
import ReactDOM from 'react-dom';
// import css from '../css/test.css';
import '../css/style.css';
import devops_image from '../images/devops.png';
import Fab from './fab';
import Card from './card';


ReactDOM.render(<Fab />, document.getElementById('fab'))

ReactDOM.render(<Card />, document.getElementById('card'))

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('clock'));
}

setInterval(tick, 1000);

const Index = () => {
  return <div>Hello React! 
      <div>
        <img src={devops_image}/>
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