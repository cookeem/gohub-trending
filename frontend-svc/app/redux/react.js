import { actionShowSideBar, actionShowLoading, actionLogin, actionMsg, actionGitRepos, actionLanguages, actionGitRepo, actionReviews } from './action';

//把redux的state输出到component的props
export const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    login: state.login,
    msg: state.msg,
    gitrepos: state.gitrepos,
    languages: state.languages,
    gitrepo: state.gitrepo,
    reviews: state.reviews,
  }
};
  
//把component的事件映射到dispatch，可以返回一系列函数
export const mapDispatchToProps = (dispatch) => {
  return {
    onSideBar: (show) => {
      dispatch(actionShowSideBar(show));
    },
    onLoading: (show) => {
      dispatch(actionShowLoading(show));
    },
    onLogin: (login) => {
      dispatch(actionLogin(login));
    },
    onMsg: (msg) => {
      dispatch(actionMsg(msg));
    },
    onGitRepos: (gitrepos) => {
      dispatch(actionGitRepos(gitrepos));
    },
    onLanguages: (languages) => {
      dispatch(actionLanguages(languages));
    },
    onGitRepo: (gitrepo) => {
      dispatch(actionGitRepo(gitrepo));
    },
    onReviews: (reviews) => {
      dispatch(actionReviews(reviews));
    },
  }
};
  

  