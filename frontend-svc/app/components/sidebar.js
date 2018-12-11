import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Whatshot from '@material-ui/icons/Whatshot';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';

import { Link } from 'react-router-dom';

import { mapDispatchToProps, mapStateToProps } from '../redux/react';
import { connect } from 'react-redux';

const styles = {
  list: {
    width: 250,
  },
};

class SideBar extends React.Component {
  render() {
    const { classes } = this.props;
    const menuList1 = [
      { text: "List Repo", icon: (<Whatshot />), url: "/gitrepo-list" },
      { text: "Account", icon: (<AccountCircle />), url: "/user-update" },
    ]
    const menuList2 = [
      { text: "Sign Out", icon: (<ExitToApp />), url: "/user-logout" },
    ]
    const menuList3 = [
      { text: "Sign In", icon: (<InsertEmoticon />), url: "/user-login" },
      { text: "Sign Up", icon: (<InsertEmoticon />), url: "/user-create" },
      { text: "Sign Out", icon: (<InsertEmoticon />), url: "/user-logout" },
      { text: "Account", icon: (<InsertEmoticon />), url: "/user-update" },
      { text: "List Repo", icon: (<InsertEmoticon />), url: "/gitrepo-list" },
      { text: "Search Repo", icon: (<InsertEmoticon />), url: "/gitrepo-search" },
      { text: "Github Repo", icon: (<InsertEmoticon />), url: "/gitrepo-view" },
    ]
    const sideList = (
      <div className={classes.list}>
        <List>
          {menuList1.map((menu, _) => (
            <Link to={menu.url} key={menu.text}>
              <ListItem button>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
        {menuList2.map((menu, _) => (
          <Link to={menu.url} key={menu.text}>
            <ListItem button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItem>
          </Link>
        ))}
        </List>
        <Divider />
        <List>
        {menuList3.map((menu, _) => (
          <Link to={menu.url} key={menu.text}>
            <ListItem button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.text} />
            </ListItem>
          </Link>
        ))}
        </List>
      </div>
    );

    return (
      <div>
        <SwipeableDrawer
          open={this.props.ui.showSideBar}
          onClose={this.props.onHideSideBar}
          onOpen={this.props.onShowSideBar}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.onHideSideBar}
            onKeyDown={this.props.onHideSideBar}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const SideBarConnect = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideBar));
