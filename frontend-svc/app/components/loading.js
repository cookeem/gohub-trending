import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  root: {
    textAlign: 'center',
    margin: theme.spacing.unit * 2,
  },
});

class CircularDeterminate extends React.Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.root}>
          <CircularProgress
            className={classes.progress}
            variant="determinate"
            value={this.state.completed}
            color="secondary"
            size={120}
          />
          <Typography variant="h6" color="inherit" align="center">
            ... Loading ...
          </Typography>  
        </Grid>
      </Grid>
    );
  }
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const LoadingView = withStyles(styles)(CircularDeterminate);
