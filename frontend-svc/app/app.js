import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Grid from '@material-ui/core/Grid';

// 非default export 必须包含{}
import { store } from './redux/store/store';
import { TopBarView, SideBarView } from './redux/react';
import { UserCreateView, UserLoginView, UserLogoutView, UserUpdateView, GitRepoListView, GitRepoViewView, LoadingView } from './components/router'

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
          <TopBarView />
          <SideBarView />
          <Grid container spacing={24} className={styles.main} style={{padding: "20px"}}>
            <Grid item xs={12}>
              <React.Suspense fallback={<div>Now loading...</div>}>
                <Switch>
                  <Route path="/user-login" component={UserLoginView}/>
                  <Route path="/user-create" component={UserCreateView}/>
                  <Route path="/user-logout" component={UserLogoutView}/>
                  <Route path="/user-update" component={UserUpdateView}/>
                  <Route path="/gitrepo-list" component={GitRepoListView}/>
                  <Route path="/gitrepo-view" component={GitRepoViewView}/>
                  <Route path="/loading" component={LoadingView}/>
                  <Redirect to="/loading"/>
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
