
export const actionShowSideBar = (showSideBar) => (
  {
    type: 'SHOW_SIDEBAR',
    showSideBar: showSideBar,
  }
);

export const actionShowComment = (showComment) => (
  {
    type: 'SHOW_COMMENT',
    showComment: showComment,
  }
);

export const actionShowDelete = (showDelete) => (
  {
    type: 'SHOW_DELETE',
    showDelete: showDelete,
  }
);

export const actionShowLoading = (showLoading) => (
  {
    type: 'SHOW_LOADING',
    showLoading: showLoading,
  }
);

export const actionLogin = (login) => (
  {
    type: 'LOGIN',
    uid: login.uid,
    username: login.username,
    userToken: login.userToken,
  }
);

