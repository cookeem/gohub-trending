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
    onShowSideBar: (e) => {
      // e.preventDefault();
      dispatch(actionShowSideBar(true));
    },
    onHideSideBar: (e) => {
      // e.preventDefault();
      dispatch(actionShowSideBar(false));
    },
    onShowComment: (e) => {
      // e.preventDefault();
      dispatch(actionShowComment(true));
    },
    onHideComment: (e) => {
      // e.preventDefault();
      dispatch(actionShowComment(false));
    },
    onShowDelete: (e) => {
      // e.preventDefault();
      dispatch(actionShowDelete(true));
    },
    onHideDelete: (e) => {
      // e.preventDefault();
      dispatch(actionShowDelete(false));
    },
    onShowLoading: (e) => {
      // e.preventDefault();
      dispatch(actionShowLoading(true));
    },
    onHideLoading: (e) => {
      // e.preventDefault();
      dispatch(actionShowLoading(false));
    },
  }
};
  

  