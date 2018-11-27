import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Fab color="secondary" className={classes.button} variant="extended">
        <DeleteIcon /> Delete
      </Fab>
      <Fab color="primary" size="large" className={classes.button} variant="round">
        <AddIcon />
      </Fab>
      <Fab color="primary" size="medium" disabled className={classes.button} variant="round">
        <Icon>edit_icon</Icon>
      </Fab>
      <Fab color="inherit" size="small" disabled className={classes.button} variant="round">
      <NavigationIcon/>
      </Fab>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);
