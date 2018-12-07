import { connect } from 'react-redux';

import { actionShowSideBar } from './action/action';
import TopBar from '../components/topbar';
import SideBar from '../components/sidebar';

//把redux的state输出到component的props
const mapStateToProps = (state) => {
    return {
      ui: state.ui,
      login: state.login,
      data: state.data,
    }
  };
  
  //把component的事件映射到dispatch，可以返回一系列函数
  const mapDispatchToProps = (dispatch) => {
    return {
      onShowSideBar: (e) => {
        // e.preventDefault();
        dispatch(actionShowSideBar(true));
      },
      onHideSideBar: (e) => {
        // e.preventDefault();
        dispatch(actionShowSideBar(false));
      },
    }
  };
  
export const TopBarView = connect(mapStateToProps, mapDispatchToProps)(TopBar);
export const SideBarView = connect(mapStateToProps, mapDispatchToProps)(SideBar);


  