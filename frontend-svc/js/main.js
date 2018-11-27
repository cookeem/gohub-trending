import React from 'react';
import ReactDOM from 'react-dom';
// import css from '../css/test.css';
import '../css/test.css';
import devops_image from '../images/devops.png';

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