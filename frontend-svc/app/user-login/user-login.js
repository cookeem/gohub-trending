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

function InputWithIcon(props) {
  const { classes } = props;

  return (
    <FormGroup row>
      <FormControl className={classes.margin} fullWidth={true}>

        <div style={{ display: 'flex', margin: 40, background: 'red', height: 300, verticalAlign: 'middle', }}>
          <Grid container spacing={24} direction="column">
            <Grid container item spacing={0} justify="center" >
              <Grid item xs={12} style={{ background: 'blue' }}>xs=12</Grid>
            </Grid>
            <Grid container item spacing={0} justify="center" >
              <Grid item xs={6} style={{ background: 'blue' }}>xs=6</Grid>
            </Grid>
            <Grid container item spacing={0} justify="center" >
              <Grid item xs={3} style={{background: 'blue'}}>xs=3</Grid>
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={8} alignItems="flex-end" justify="center" style={{background: 'red'}}>
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item xs={10}>
            <TextField id="username" label="Input your username" fullWidth={true}/>
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end" justify="center">
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
              // checked={this.state.checkedB}
              // onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
            /> Remember me
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end" justify="center">
          <Grid item xs={6}>
            <Button variant="contained" color="secondary">
              <div style={{padding: "5px"}}>Sign In</div>
              <Face/>
            </Button>
          </Grid>  
          <Grid item xs={6}>
            <Button variant="contained" color="primary">
            <div style={{padding: "5px"}}>Sign Up</div>
              {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
              <GroupAdd/>
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </FormGroup>
  );
}

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

const InputWithIconStyle = withStyles(styles)(InputWithIcon);

function CenteredGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center">
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography variant="h5" color="inherit" align="center" className={classes.barText}>
              User Sign In
            </Typography> 
            <Grid container spacing={24} justify="center">
              <Grid item xs={6}>
                <InputWithIconStyle />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CenteredGridStyle = withStyles(styles)(CenteredGrid);

export const UserLogin = () => {
  return (
    <CenteredGridStyle />
  )
};
        
