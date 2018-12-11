import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Grid from '@material-ui/core/Grid';

// 非default export 必须包含{}
import { store } from './redux/store/store';
import { TopBarConnect } from './components/topbar';
import { SideBarConnect } from './components/sidebar';
import { LoadingView } from './components/loading';
import { CommentDialogConnect, DeleteDialogConnect, ErrorDialog, SuccessTips } from './components/dialog';
import { GitRepoViewView } from './gitrepo-view';
import { UserCreateView, UserLoginView, UserLogoutView, UserUpdateView, GitRepoSearchView, GitRepoListView } from './components/router'

import './css/style.css';

const theme = createMuiTheme(
  {
    palette: {
      primary: yellow,
      secondary: lightBlue,
    },
    typography: {
      useNextVariants: true,
    },
  }
);

const styles = theme => ({
  main: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2,
  },
});

const App = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <TopBarConnect />
          <SideBarConnect />
          <CommentDialogConnect />
          <DeleteDialogConnect />
          <ErrorDialog />
          <SuccessTips />
          <LoadingView />
          <Grid container spacing={24} className={styles.main} style={{padding: "20px"}}>
            <Grid item xs={12}>
              <React.Suspense fallback={<div>Now loading...</div>}>
                <Switch>
                  <Route path="/user-login" component={UserLoginView}/>
                  <Route path="/user-create" component={UserCreateView}/>
                  <Route path="/user-logout" component={UserLogoutView}/>
                  <Route path="/user-update" component={UserUpdateView}/>
                  <Route path="/gitrepo-search" component={GitRepoSearchView}/>
                  <Route path="/gitrepo-list" component={GitRepoListView}/>
                  <Route path="/gitrepo-view" component={GitRepoViewView}/>
                  <Redirect to="/gitrepo-view"/>
                </Switch>
              </React.Suspense>
            </Grid>
          </Grid>  
        </MuiThemeProvider>
      </Provider>  
    </HashRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
