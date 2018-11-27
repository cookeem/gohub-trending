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