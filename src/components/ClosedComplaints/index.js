import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Demo from './demo';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

class ClosedComplaints extends Component {
    constructor(props) {
      super(props);
   
      this.state = {
        refID: "",
      };
    }


    onChange = event => {
        console.log(event.target.value);
        this.setState({refID: event.target.value});
        
      };

    render() {
        return(
            <div style={{paddingTop: "2%"}}>
                <Grid container spacing={3}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={useStyles.paper}>
                        <div className="titleCenter">
                            <p>
                            <Typography component="h5" variant="h5" color="primary" gutterBottom>
                                Search Closed Complaints
                            </Typography>
                            </p>
                        </div>
                        <div className="tabClosedComplaints">
                        <b><i>Reference ID: </i></b>
                        </div>
                        <div className="tabClosedComplaints">
                        <form noValidate>
                            <TextField id="standard-basic" name="refID" onChange={this.onChange}/>
                        </form>
                        </div>
                        <div className="searchClosedComplaints">
                        <Demo refID={this.state.refID} firebase={this.props.firebase.db} /> 
                        </div>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid> 
                
            </div>
        )
    }

}

export default withFirebase(ClosedComplaints);