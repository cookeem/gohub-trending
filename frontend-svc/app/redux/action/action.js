
export const actionShowSideBar = (showSideBar) => (
  {
    type: 'SHOWSIDEBAR',
    showSideBar: showSideBar,
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

