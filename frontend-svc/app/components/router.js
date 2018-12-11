import React from 'react';
import { UserLogin } from '../user-login';
import { UserCreate } from '../user-create';
import { UserUpdate } from '../user-update';
import { GitRepoList } from '../gitrepo-list';
import { GitRepoSearch } from '../gitrepo-search';

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
