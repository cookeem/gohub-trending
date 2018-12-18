import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { mapDispatchToProps, mapStateToProps } from './redux/react';
import { connect } from 'react-redux';
import axios from 'axios';

import { stateInitLogin } from './redux/reducer';

class UserLogoutForm extends React.Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();
    const userToken = cookies.get('user-token');

    this.props.onLoading(true);
    axios({
      url: 'http://localhost:3000/users/logout',
      method: 'post',
      headers: {'x-user-token': userToken, },
      timeout: 5000,
    }).then((response) => {
      let msg = {
        error: response.data.error,
        msg: response.data.msg,
      };
      this.props.onMsg(msg);
    }).catch((error) => {
      if (!error.response) {
        let msg = {
          error: 1,
          msg: "Error: Network Error",
        };
        this.props.onMsg(msg);
      } else if (error.response.status == 403) {
        let msg = {
          error: error.response.data.error,
          msg: error.response.data.msg,
        };
        this.props.onMsg(msg);
      } else {
        let msg = {
          error: 1,
          msg: String(error),
        };
        this.props.onMsg(msg);
      }
    }).then(() => {
      cookies.remove('user-token');

      this.props.onLogin(stateInitLogin);
      this.props.onGitRepos([]);
      this.props.onLanguages([]);
      this.props.onGitRepo({});
      this.props.onReviews([]);

      this.props.onLoading(false);
    });

    cookies.remove('user-token');
  };

  render() {
    return (
      <Redirect to="/user-login"/>
    )
  }
}

const UserLogoutConnect = connect(mapStateToProps, mapDispatchToProps)(UserLogoutForm);

export const UserLogout = () => {
  return (
    <UserLogoutConnect />
  )
};

