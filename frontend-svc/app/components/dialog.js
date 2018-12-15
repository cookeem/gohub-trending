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
  onShowComment = () => {
    this.props.onComment(true)
  }

  onHideComment = () => {
    this.props.onComment(false)
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.ui.showComment}
          onClose={this.onHideComment}
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
            <Button onClick={this.onHideComment} color="secondary">
              Comment
            </Button>
            <Button onClick={this.onHideComment} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

class DeleteDialog extends React.Component {
  onShowDelete = () => {
    this.props.onDelete(true)
  }

  onHideDelete = () => {
    this.props.onDelete(false)
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.ui.showDelete}
          onClose={this.onHideDelete}
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
            <Button onClick={this.onHideDelete} color="secondary">
              Delete
            </Button>
            <Button onClick={this.onHideDelete} color="secondary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

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
      <div>
        <Dialog
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
      </div>
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
      <div>
        {/* <Button onClick={this.handleClick(TransitionUp)}>success message</Button> */}
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
      </div>
    );
  }
}

export const CommentDialogConnect = connect(mapStateToProps, mapDispatchToProps)(CommentDialog);
export const DeleteDialogConnect = connect(mapStateToProps, mapDispatchToProps)(DeleteDialog);
export const ErrorDialogConnect = connect(mapStateToProps, mapDispatchToProps)(ErrorDialog);
export const SuccessTipsConnect = connect(mapStateToProps, mapDispatchToProps)(SuccessTips);

