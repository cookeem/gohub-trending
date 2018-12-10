import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

import { mapDispatchToProps, mapStateToProps } from '../redux/react';
import { connect } from 'react-redux';

class CommentDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.ui.showComment}
          onClose={this.props.onHideComment}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="comment">Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please left your github repository comment here
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              label="Comment"
              multiline
              rows={3}
              rowsMax={6}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onHideComment} color="secondary">
              Comment
            </Button>
            <Button onClick={this.props.onHideComment} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

class DeleteDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.ui.showDelete}
          onClose={this.props.onHideDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Do you want to delete this comment?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Comment can not recover after delete, are you sure want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onHideDelete} color="secondary">
              Delete
            </Button>
            <Button onClick={this.props.onHideDelete} color="secondary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export const CommentDialogConnect = connect(mapStateToProps, mapDispatchToProps)(CommentDialog);
export const DeleteDialogConnect = connect(mapStateToProps, mapDispatchToProps)(DeleteDialog);

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export class ErrorDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          error dialog
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={TransitionUp}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Error Message!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              error message here.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Get It!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export class SuccessTips extends React.Component {
  state = {
    open: false,
    Transition: null,
  };

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick(TransitionUp)}>success message</Button>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={2000}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}
