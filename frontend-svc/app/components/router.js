import React from 'react';
import { UserLogin } from '../user-login';
import { UserCreate } from '../user-create';
import { UserUpdate } from '../user-update';
import { GitRepoList } from '../gitrepo-list';
import { GitRepoSearch } from '../gitrepo-search';

import axios from 'axios';

export const UserLoginView = () => (
  <UserLogin />
);

export const UserCreateView = () => (
  <UserCreate />
);

export const UserLogoutView = () => (
  <div>user-logout</div>
);

export const UserUpdateView = () => (
  <UserUpdate />
);

export const GitRepoSearchView = () => (
  <GitRepoSearch />
);

export const GitRepoListView = () => (
  <GitRepoList />
);

import jwtDecode from 'jwt-decode';

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvb2tlZW0iLCJ1aWQiOjEsImV4cCI6MTU0NDE2NTcyMiwiaWF0IjoxNTQ0MTY0ODIyLCJpc3MiOiJnaXRyZXBvIn0.8LEyAl7liykbs9kQG_VCtvEo-6TTpWAzmmEBINbUzdU';
try {
  var output = jwtDecode(token);
  console.log(output);
} catch(e) {
  console.log(e);
}

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
  // url:'https://api.github.com/search/repositories?q=topic:kubernetes',
  url:'http://localhost:3000/users/',
  method:'get',
  timeout: 5000,
}).then(function (response) {
  // response = checkStatus(response);
  console.log('fetch github api succeeded!');
  console.log(response.data);
  console.log(response.headers);
}).catch(function (error) {
  console.log('fetch github api failed!');
  // console.log(response.data);
  // console.log(response.headers);
  console.log(error)
  console.log(error.response);
}).then(function () {
  // always executed
  console.log('always show fetch github api!');
});
