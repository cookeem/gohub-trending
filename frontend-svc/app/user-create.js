import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Face from '@material-ui/icons/Face';
import GroupAdd from '@material-ui/icons/GroupAdd';

import { mapDispatchToProps, mapStateToProps } from './redux/react';
import { connect } from 'react-redux';
import { serviceQuery } from './components/functions';
import { LoadingView } from './components/loading';

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


class UserCreateForm extends React.Component {
  state = {
    username: "",
    password: "",
    repassword: "",
    usernamePrompt: "",
    passwordPrompt: "",
    repasswordPrompt: "",
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = () => {
    //注意，this.setState是异步操作
    var usernamePrompt = "";
    if (this.state.username == "") {
      usernamePrompt = "username can not be empty";
      console.log(this.state);
    } else if (this.state.username.length < 3 ) {
      usernamePrompt = "username must more than 2 characters";
    } else if (this.state.username.length > 12) {
      usernamePrompt = "username must less than 13 characters";
    } else {
      usernamePrompt = "";
    }
    var passwordPrompt = "";
    if (this.state.password == "") {
      passwordPrompt = "password can not be empty";
    } else if (this.state.password.length < 6 ) {
      passwordPrompt = "password must more than 5 characters";
    } else if (this.state.password.length > 20) {
      passwordPrompt = "password must less than 21 characters";
    } else {
      passwordPrompt = "";
    }
    var repasswordPrompt = "";
    if (this.state.repassword == "") {
      repasswordPrompt = "repeat password can not be empty";
    } else if (this.state.repassword.length < 6 ) {
      repasswordPrompt = "repeat password must more than 5 characters";
    } else if (this.state.repassword.length > 20) {
      repasswordPrompt = "repeat password must less than 21 characters";
    } else if (this.state.repassword != this.state.password) {
      repasswordPrompt = "repeat password and password must be same";
    } else {
      repasswordPrompt = "";
    }
    this.setState({ usernamePrompt: usernamePrompt });
    this.setState({ passwordPrompt: passwordPrompt });
    this.setState({ repasswordPrompt: repasswordPrompt });
    if (usernamePrompt == "" && passwordPrompt == "" && repasswordPrompt == "") {
      this.props.onLoading(true);
      var bodyFormData = new FormData();
      bodyFormData.append('username', this.state.username);
      bodyFormData.append('password', this.state.password);
      bodyFormData.append('repassword', this.state.repassword);

      const axiosConfig = {
        url: 'http://localhost:3000/users/',
        method: 'post',
        data: bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }},
        timeout: 5000,
      };
      const axiosSuccess = (obj, response) => {
        window.location.href = "/#/gitrepo-list";
      };
      const axiosFail = (obj, response) => {
      };
      serviceQuery(this.props, axiosConfig, axiosSuccess, axiosFail);
    }
    console.log('###', this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        {
          (!this.props.ui.showLoading) ? (
            <FormGroup row>
              <FormControl className={classes.margin} fullWidth={true}>
                <Grid container spacing={16} alignItems="flex-end" justify="center">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField id="username" onChange={this.handleChange} error={this.state.usernamePrompt != ""} helperText={this.state.usernamePrompt} autoFocus label="Input your username" fullWidth={true}/>
                  </Grid>
                </Grid>
                <Grid container spacing={16} alignItems="flex-end" justify="center">
                  <Grid item>
                    <VpnKey />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField id="password" onChange={this.handleChange} error={this.state.passwordPrompt != ""} helperText={this.state.passwordPrompt} type="password" label="Input your password" fullWidth={true} autoComplete="current-password"/>
                  </Grid>
                </Grid>
                <Grid container spacing={16} alignItems="flex-end" justify="center">
                  <Grid item>
                    <VpnKey />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField id="repassword" onChange={this.handleChange} error={this.state.repasswordPrompt != ""} helperText={this.state.repasswordPrompt} type="password" label="Repeat your password" fullWidth={true} autoComplete="current-password"/>
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end" justify="center" style={{height: 80}}>
                  <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                    <div style={{padding: "5px"}}>Sign Up</div>
                      <GroupAdd/>
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" color="secondary" href="/#/user-login">
                      <div style={{padding: "5px"}}>Sign In</div>
                      <Face/>
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </FormGroup>
          ) : (
            <LoadingView />
          )
        }
      </Fragment>


    )
  }
}

UserCreateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const UserCreateFormConnect = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserCreateForm));

function UserCreatePage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center" style={{height: 120}}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography variant="h5" color="inherit" align="center" className={classes.barText}>
              User Sign Up
            </Typography>
            <Grid container spacing={24} justify="center">
              <Grid item xs={6}>
                <UserCreateFormConnect />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

UserCreatePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const UserCreatePageStyle = withStyles(styles)(UserCreatePage);

export const UserCreate = () => {
  return (
    <UserCreatePageStyle />
  )
};

