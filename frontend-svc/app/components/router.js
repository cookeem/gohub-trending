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

