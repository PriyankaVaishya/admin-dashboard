import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

const SignOutButton = ({ firebase }) => (
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={firebase.doSignOut}>
                        <Link to={ROUTES.LANDING}>
                          <ExitToAppIcon />
                          </Link>
                </IconButton>


  // <button type="button" onClick={firebase.doSignOut}>
  //   <Link to={ROUTES.LANDING}>
  //   Sign Out
  //   </Link>
  // </button>
);

export default withFirebase(SignOutButton);