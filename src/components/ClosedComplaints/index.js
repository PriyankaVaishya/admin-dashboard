import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Typography from '@material-ui/core/Typography';

class ClosedComplaints extends Component {
    constructor(props) {
      super(props);
   
      this.state = {
        loading: false,
      };
    }

    render() {
        return(
            <div>
                <div className="titleCenter">
                    <p>
                    <Typography component="h4" variant="h4" color="primary" gutterBottom>
                        Search Closed Complaints
                    </Typography>
                    </p>
                </div>
            </div>
        )
    }

}

export default withFirebase(ClosedComplaints);