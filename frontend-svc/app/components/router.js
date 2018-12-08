import React from 'react';
import Loading from './loading';
import { UserLogin } from '../user-login/user-login';

export const UserLoginView = () => (
  <UserLogin />
);

export const UserCreateView = () => (
  <div>user-create</div>
);

export const UserLogoutView = () => (
  <div>user-logout</div>
);

export const UserUpdateView = () => (
  <div>user-update</div>
);

export const GitRepoListView = () => (
  <div>girepor-list</div>
);

export const GitRepoViewView = () => (
  <div>girepor-view</div>
);

export const LoadingView = () => (
  <Loading />
);

import jwtDecode from 'jwt-decode';

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvb2tlZW0iLCJ1aWQiOjEsImV4cCI6MTU0NDE2NTcyMiwiaWF0IjoxNTQ0MTY0ODIyLCJpc3MiOiJnaXRyZXBvIn0.8LEyAl7liykbs9kQG_VCtvEo-6TTpWAzmmEBINbUzdU';
try {
  var output = jwtDecode(token);
  console.log(output);
} catch(e) {
  console.log(e);
}
