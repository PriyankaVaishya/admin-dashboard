import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const PasswordForgetPage = () => (
  <Grid container spacing={3}>
      <Grid item xs>
      </Grid>
      <Grid item xs={6}>
  <div>
    <h1>Retrieve Password</h1>
    <PasswordForgetForm />
  </div>
  </Grid>
  <Grid item xs>
      </Grid>
  </Grid>
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
};
 
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, error } = this.state;
 
    const isInvalid = email === '';
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit"
        style={{marginLeft:'12px'}}>
          Reset My Password
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
 
export default PasswordForgetPage;
 
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };