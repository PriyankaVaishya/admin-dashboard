import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import HomeIcon from '@material-ui/icons/Home';
import RoomIcon from '@material-ui/icons/Room';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from 'clsx';
import {  useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
const drawerWidth = 240;

//class Example extends React.Component {
//  constructor(props) {
//    super(props);
//    this.state = {
//      open: false
//    };
//  };
//  };
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    align: 'center',
  },
  drawer: {
  [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      }
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
   signOutButton: {
        alignItems: 'center',
    },

  hide: {
    display: 'none',
  },
}));
// const handleDrawerOpen = () => {
//     Example.state.open=true;
//   };
//
//   const handleDrawerClose = () => {
//    Example.state.open=false;
//   };
const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);
const NavigationAuth = (firebase) => (
  <div className={useStyles.root}>
  <CssBaseline/>
      <AppBar position="static"
              className={clsx(useStyles.appBar, {
                [useStyles.appBarShift]: false,
              })}>
        <Toolbar>
          <IconButton edge="start"
          className={clsx(useStyles.menuButton, true && useStyles.hide)}
          color="inherit"
          aria-label="open drawer"
          //onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={useStyles.title}>
            Hello Admin
          </Typography>
        </Toolbar>
      </AppBar>
<Drawer
        className={useStyles.drawer}
        variant="permanent"
        anchor="left"
       // Example.state.open={open}
        classes={{
          paper: useStyles.drawerPaper,
        }}
      >
        <List>
                      <ListItem >
                        <ListItemIcon>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Link to={ROUTES.LANDING}>
                           <DashboardIcon />
                           </Link>
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText primary="Landing Page" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Link to={ROUTES.HOME}>
                                <FormatListBulletedIcon />
                            </Link>
                        </IconButton>
                        </ListItemIcon>
                        <ListItemText primary="Current Complaints" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <IconButton edge="start" color="inherit" aria-label="menu">
                            <Link to={ROUTES.CLOSEDCOMPLAINTS}>
                            <AssignmentTurnedInIcon />
                            </Link>
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText primary="Closed Complaints" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <IconButton edge="start" color="inherit" aria-label="menu">
                            <Link to={ROUTES.MAP}>
                            <RoomIcon />
                            </Link>
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText primary="Maps" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                        <Link to={ROUTES.ACCOUNT}>
                          <AccountCircleIcon />
                          </Link>
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                      </ListItem>
                      <ListItem >
                        <ListItemIcon>
                            <SignOutButton />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" />
                      </ListItem>
                    </List>
      </Drawer>
    </div>

  // <ul>
  //   <li>
  //     <Link to={ROUTES.LANDING}>Landing</Link>
  //   </li>
  //   <li>
  //     <Link to={ROUTES.HOME}>Home</Link>
  //   </li>
  //   <li>
  //     <Link to={ROUTES.ACCOUNT}>Account</Link>
  //   </li>
  //   <li>
  //     <SignOutButton />
  //   </li>
  // </ul>
);
 
const NavigationNonAuth = () => (
  <div className={useStyles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={useStyles.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={useStyles.title}>
            Hello Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
              className={useStyles.drawer}
              variant="permanent"
              anchor="left"
              classes={{
                paper: useStyles.drawerPaper,
              }}
            >
              <List>
                            <ListItem >
                              <ListItemIcon>
                              <IconButton edge="start" color="inherit" aria-label="menu">
                                  <Link to={ROUTES.LANDING}>
                                 <DashboardIcon />
                                 </Link>
                                </IconButton>
                              </ListItemIcon>
                              <ListItemText primary="Landing Page" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                              <IconButton edge="start" color="inherit" aria-label="menu">
                              <Link to={ROUTES.SIGN_IN}>
                                <AccountCircleIcon />
                                </Link>
                                </IconButton>
                              </ListItemIcon>
                              <ListItemText primary="Sign In" />
                            </ListItem>
                          </List>
            </Drawer>
    </div>
  // <ul>
  //   <li>
  //     <Link to={ROUTES.LANDING}>Landing</Link>
  //   </li>
  //   <li>
  //     <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  //   </li>
  // </ul>
);
 
export default Navigation;