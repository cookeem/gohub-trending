
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

export const actionMsg = (msg) => (
  {
    type: 'MSG',
    error: msg.error,
    msg: msg.msg,
  }
);

export const actionGitRepos = (gitrepos) => (
  {
    type: 'GIT_REPOS',
    gitrepos: gitrepos,
  }
);

export const actionLanguages = (languages) => (
  {
    type: 'LANGUAGES',
    languages: languages,
  }
);

export const actionGitRepo = (gitrepo) => (
  {
    type: 'GIT_REPO',
    gitrepo: gitrepo,
  }
);

export const actionReviews = (reviews) => (
  {
    type: 'REVIEWS',
    reviews: reviews,
  }
);
