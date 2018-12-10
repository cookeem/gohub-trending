import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import GithubIcon from '../images/github.png';

import { mapDispatchToProps, mapStateToProps } from '../redux/react';
import { connect } from 'react-redux';

const styles = {
  root: {
    flexGrow: 1,
    paddingLeft: 0,
    paddingTop: 0,
  },
  topBar: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -10,
    // marginRight: 20,
  },
  barText: {
    marginLeft: 10,
  },
};

function TopBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={props.onShowSideBar} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Grid container className={classes.topBar} alignContent="center" alignItems="center">
            <Grid item xs={5} align="right">
              <Avatar alt="Natacha" src={GithubIcon} align="center"/>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h6" color="inherit" align="left" className={classes.barText}>
                Github Trending Go - {props.login.username}
              </Typography>  
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const TopBarConnect = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopBar));
