import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import GithubIcon from '../images/github.png';

const styles = {
  root: {
    flexGrow: 1,
    paddingLeft: 0,
    paddingTop: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Grid container className={classes.grow} alignContent="center" alignItems="center">
            <Grid item xs={6} align="right" className={{padding: "2px"}}>
              <Avatar alt="Natacha" src={GithubIcon} align="center"/>
            </Grid>
            <Grid item  xs={6}>
              <Typography variant="h6" color="inherit" align="left">
                HAHA
              </Typography>  
            </Grid>
          </Grid>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
