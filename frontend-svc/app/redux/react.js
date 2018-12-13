import { actionShowSideBar, actionShowComment, actionShowDelete, actionShowLoading } from './action';

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
      // e.preventDefault();
      dispatch(actionShowSideBar(show));
    },
    onComment: (show) => {
      // e.preventDefault();
      dispatch(actionShowComment(show));
    },
    onDelete: (show) => {
      // e.preventDefault();
      dispatch(actionShowDelete(show));
    },
    onLoading: (show) => {
      // e.preventDefault();
      dispatch(actionShowLoading(show));
    },
  }
};
  

  