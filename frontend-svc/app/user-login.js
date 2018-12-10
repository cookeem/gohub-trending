import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Face from '@material-ui/icons/Face';
import GroupAdd from '@material-ui/icons/GroupAdd';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 300,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

function UserLoginForm(props) {
  const { classes } = props;

  return (
    <FormGroup row>
      <FormControl className={classes.margin} fullWidth={true}>
        <Grid container spacing={16} alignItems="flex-end" justify="center">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item xs={10}>
            <TextField id="username" label="Input your username" fullWidth={true}/>
          </Grid>
        </Grid>
        <Grid container spacing={16} alignItems="flex-end" justify="center">
          <Grid item>
            <VpnKey />
          </Grid>
          <Grid item xs={10}>
            <TextField id="password" type="password" label="Input your password" fullWidth={true} autoComplete="current-password"/>
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end" justify="flex-start">
          <Grid item xs={12}>
            <Checkbox
              value="checkedB"
              color="primary"
            /> Remember me
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end" justify="center" style={{height: 80}}>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary">
              <div style={{padding: "5px"}}>Sign In</div>
              <Face/>
            </Button>
          </Grid>  
          <Grid item xs={6}>
            <Button variant="contained" color="primary">
              <div style={{padding: "5px"}}>Sign Up</div>
              <GroupAdd/>
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </FormGroup>
  );
}

UserLoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const UserLoginFormStyle = withStyles(styles)(UserLoginForm);

function UserLoginPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center" style={{height: 120}}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography variant="h5" color="inherit" align="center" className={classes.barText}>
              User Sign In
            </Typography> 
            <Grid container spacing={24} justify="center">
              <Grid item xs={6}>
                <UserLoginFormStyle />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

UserLoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const UserLoginPageStyle = withStyles(styles)(UserLoginPage);

export const UserLogin = () => {
  return (
    <UserLoginPageStyle />
  )
};
        
