
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

export const actionLogin = (uid, username, userToken) => (
  {
    type: 'LOGIN',
    uid: uid,
    username: username,
    userToken: userToken,
  }
);

