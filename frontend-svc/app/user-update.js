import React, { Fragment } from 'react';
import Cookies from 'universal-cookie';
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

import { mapDispatchToProps, mapStateToProps } from './redux/react';
import { connect } from 'react-redux';
import { serviceQuery } from './components/functions';
import { LoadingView } from './components/loading';

import { backendUri } from './config';

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

export default class UserUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();
    this.props.onLoading(true);
    const userToken = cookies.get('user-token');
    var bodyFormData = new FormData();
    bodyFormData.append('username', this.state.username);
    bodyFormData.append('password', this.state.password);

    const axiosConfig = {
      url: backendUri+'/users/',
      method: 'get',
      headers: {'x-user-token': userToken, },
      timeout: 5000,
    };
    const axiosSuccess = (obj, response) => {
    };
    const axiosFail = (obj, response) => {
    };
    serviceQuery(this.props, axiosConfig, axiosSuccess, axiosFail);
  }

  state = {
    oldpassword: "",
    password: "",
    repassword: "",
    oldpasswordPrompt: "",
    passwordPrompt: "",
    repasswordPrompt: "",
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = () => {
    const cookies = new Cookies();
    //注意，this.setState是异步操作
    var oldpasswordPrompt = "";
    if (this.state.oldpassword == "") {
      oldpasswordPrompt = "old password can not be empty";
    } else if (this.state.oldpassword.length < 6 ) {
      oldpasswordPrompt = "old password must more than 5 characters";
    } else if (this.state.oldpassword.length > 20) {
      oldpasswordPrompt = "old password must less than 21 characters";
    } else {
      oldpasswordPrompt = "";
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
    this.setState({ oldpasswordPrompt: oldpasswordPrompt });
    this.setState({ passwordPrompt: passwordPrompt });
    this.setState({ repasswordPrompt: repasswordPrompt });
    if (oldpasswordPrompt == "" && passwordPrompt == "" && repasswordPrompt == "") {
      this.props.onLoading(true);
      var bodyFormData = new FormData();
      bodyFormData.append('oldpassword', this.state.oldpassword);
      bodyFormData.append('password', this.state.password);
      bodyFormData.append('repassword', this.state.repassword);
      const userToken = cookies.get('user-token');

      const axiosConfig = {
        url: backendUri+'/users/',
        method: 'put',
        data: bodyFormData,
        headers: {'x-user-token': userToken, },
        config: { headers: {'Content-Type': 'multipart/form-data' }},
        timeout: 5000,
      };
      const axiosSuccess = (obj, response) => {
      };
      const axiosFail = (obj, response) => {
      };
      serviceQuery(this.props, axiosConfig, axiosSuccess, axiosFail);
    }
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
                    <VpnKey />
                  </Grid>
                  <Grid item xs={10}>
                    <TextField id="oldpassword" onChange={this.handleChange} error={this.state.oldpasswordPrompt != ""} helperText={this.state.oldpasswordPrompt} type="password" label="Input your old password" fullWidth={true} autoComplete="current-password"/>
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
                    <TextField id="repassword" onChange={this.handleChange} error={this.state.repasswordPrompt != ""} helperText={this.state.repasswordPrompt} type="password" label="Repeat your new password" fullWidth={true} autoComplete="current-password"/>
                  </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end" justify="center" style={{height: 80}}>
                  <Grid item xs={6}>
                    <Button variant="contained" color="secondary" onClick={this.handleSubmit} style={{color: "#FFF"}}>
                      <div style={{padding: "5px"}}>Change Password</div>
                      <Autorenew/>
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

UserUpdateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const UserUpdateFormConnect = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserUpdateForm));

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
                <UserUpdateFormConnect />
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
        
