import { actionShowSideBar, actionShowComment, actionShowDelete, actionShowLoading, actionLogin } from './action';

//把redux的state输出到component的props
export const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    login: state.login,
    data: state.data,
  }
};
  
//把component的事件映射到dispatch，可以返回一系列函数
export const mapDispatchToProps = (dispatch) => {
  return {
    onSideBar: (show) => {
      dispatch(actionShowSideBar(show));
    },
    onComment: (show) => {
      dispatch(actionShowComment(show));
    },
    onDelete: (show) => {
      dispatch(actionShowDelete(show));
    },
    onLoading: (show) => {
      dispatch(actionShowLoading(show));
    },
    onLogin: (login) => {
      dispatch(actionLogin(login));
    },
  }
};
  

  