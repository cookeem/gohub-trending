import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

import './css/style.css';

const theme = createMuiTheme(
  {
    palette: {
      primary: blue,
      secondary: pink,
    },
    typography: {
      useNextVariants: true,
    },
  }
);
  
const AppBar = React.lazy(() => import('./components/appbar'));

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <React.Suspense fallback={<div>Now loading...</div>}>
        <AppBar />
      </React.Suspense>
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));