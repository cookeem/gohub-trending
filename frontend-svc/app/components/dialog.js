import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import { mapDispatchToProps, mapStateToProps } from '../redux/react';
import { connect } from 'react-redux';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export class ErrorDialog extends React.Component {
  onHideMsg = () => {
    let msg = {
      error: 0,
      msg: "",
    };
    this.props.onMsg(msg);
  }

  render() {
    return (
      <Dialog
        style={{zIndex: 200}}
        open={this.props.msg.error != 0 && this.props.msg.msg != ""}
        onClose={this.onHideMsg}
        TransitionComponent={TransitionUp}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <div style={{color: '#FF0000'}}>Error!</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{color: '#FF0000'}}>
            {this.props.msg.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onHideMsg} color="secondary">
            Get It!
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export class SuccessTips extends React.Component {
  onHideMsg = () => {
    let msg = {
      error: 0,
      msg: "",
    };
    this.props.onMsg(msg);
  }

  render() {
    return (
      <Snackbar
        open={this.props.msg.error == 0 && this.props.msg.msg != ""}
        onClose={this.onHideMsg}
        autoHideDuration={1500}
        TransitionComponent={TransitionUp}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={this.props.msg.msg}
      />
    );
  }
}

export const ErrorDialogConnect = connect(mapStateToProps, mapDispatchToProps)(ErrorDialog);
export const SuccessTipsConnect = connect(mapStateToProps, mapDispatchToProps)(SuccessTips);

