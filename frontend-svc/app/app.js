import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';

// default export 不能包含{}
import TopBar from './components/topbar';
import SideBar from './components/sidebar';

// 非default export 必须包含{}
import { actionShowSideBar, actionLogin } from './redux/action/action';
import { store } from './redux/store/store';

import './css/style.css';

const theme = createMuiTheme(
  {
    palette: {
      primary: yellow,
      secondary: pink,
    },
    typography: {
      useNextVariants: true,
    },
  }
);

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
    onClickShowSideBar: (e) => {
      e.preventDefault();
      dispatch(actionShowSideBar(true));
      dispatch(actionLogin(1, "cookeem", "my-token"));
    },
  }
};

const TopBarRedux = connect(mapStateToProps, mapDispatchToProps)(TopBar);
const SideBarRedux = connect(mapStateToProps, mapDispatchToProps)(SideBar);

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <TopBarRedux />
        <SideBarRedux />
      </MuiThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
