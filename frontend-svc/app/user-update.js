import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import VpnKey from '@material-ui/icons/VpnKey';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Autorenew from '@material-ui/icons/Autorenew';

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

function UserUpdateForm(props) {
  const { classes } = props;

  return (
    <FormGroup row>
      <FormControl className={classes.margin} fullWidth={true}>
      <Grid container spacing={16} alignItems="flex-end" justify="center">
          <Grid item>
            <VpnKey />
          </Grid>
          <Grid item xs={10}>
            <TextField id="oldpassword" type="password" label="Input your old password" fullWidth={true} autoComplete="current-password"/>
          </Grid>
        </Grid>
        <Grid container spacing={16} alignItems="flex-end" justify="center">
          <Grid item>
            <VpnKey />
          </Grid>
          <Grid item xs={10}>
            <TextField id="password" type="password" label="Input your new password" fullWidth={true} autoComplete="current-password"/>
          </Grid>
        </Grid>
        <Grid container spacing={16} alignItems="flex-end" justify="center">
          <Grid item>
            <VpnKey />
          </Grid>
          <Grid item xs={10}>
            <TextField id="repassword" type="password" label="Repeat your new password" fullWidth={true} autoComplete="current-password"/>
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end" justify="center" style={{height: 80}}>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary">
            <div style={{padding: "5px"}}>Change Password</div>
              <Autorenew/>
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </FormGroup>
  );
}

UserUpdateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const UserUpdateFormStyle = withStyles(styles)(UserUpdateForm);

function UserUpdatePage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center" style={{height: 120}}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography variant="h5" color="inherit" align="center" className={classes.barText}>
              Change your password
            </Typography> 
            <Grid container spacing={24} justify="center">
              <Grid item xs={6}>
                <UserUpdateFormStyle />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

UserUpdatePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const UserUpdatePageStyle = withStyles(styles)(UserUpdatePage);

export const UserUpdate = () => {
  return (
    <UserUpdatePageStyle />
  )
};
        
