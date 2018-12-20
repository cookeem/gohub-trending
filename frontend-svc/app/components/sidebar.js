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
import Search from '@material-ui/icons/Search';

import { Link } from 'react-router-dom';

import { mapDispatchToProps, mapStateToProps } from '../redux/react';
import { connect } from 'react-redux';

const styles = {
  list: {
    width: 250,
  },
};

class SideBar extends React.Component {
  onShowSideBar = () => {
    this.props.onSideBar(true)
  }

  onHideSideBar = () => {
    this.props.onSideBar(false)
  }

  render() {
    const { classes } = this.props;
    const menuList1 = [
      { text: "List Repo", icon: (<Whatshot />), url: "/gitrepo-list" },
      { text: "Search Repo", icon: (<Search />), url: "/gitrepo-search" },
      { text: "Account", icon: (<AccountCircle />), url: "/user-update" },
    ]
    const menuList2 = [
      { text: "Sign Out", icon: (<ExitToApp />), url: "/user-logout" },
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
      </div>
    );

    return (
      <div>
        <SwipeableDrawer
          open={this.props.ui.showSideBar}
          onClose={this.onHideSideBar}
          onOpen={this.onShowSideBar}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.onHideSideBar}
            onKeyDown={this.onHideSideBar}
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
