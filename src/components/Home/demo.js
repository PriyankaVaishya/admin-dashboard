import React from 'react';
import { withFirebase } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

function updateTemp(props, userID, postID, choice) {


    if(choice == 4) {
        alert("This will shift the complaint to closed complaints.");
        // firebase.collection('posts').doc(userID)
        //         .collection('userPosts').doc(postID).get().then(document => {
        //           const fetchedPost = {
        //             id: document.id,
        //             ...document.data()
        //           };

        //         this.props.firebase.db.collection('posts').doc(userID)
        //        .collection('closedComplaints').doc(postID).set(fetchedPost);

        //        this.props.firebase.db.collection('posts').doc(userID)
        //        .collection('userPosts').doc(postID).delete(
        //          console.log("Deleted")
        //        ).catch(error => 
        //         console.error("Error removing post: ", error));

        //         });     
        //      window.location.reload();

    }

      if(choice == 1) {
        props.firebase.collection('posts').doc(userID)
                .collection('userPosts').doc(postID).set({
          status: 'Processing'
      }, { merge: true });
      }

    if(choice == 2) {
      props.firebase.collection('posts').doc(userID)
              .collection('userPosts').doc(postID).set({
        status: 'Assigned to Operator'
    }, { merge: true });
    }

  if(choice == 3) {
    props.firebase.collection('posts').doc(userID)
            .collection('userPosts').doc(postID).set({
      status: 'Work in Progress'
  }, { merge: true });
  }
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "40%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [reload, setReload] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if(reload)
    window.location.reload();
  };

  const updateTemp = (userID, postID, choice) => {


    if(choice == 4) {
        alert("This will shift the complaint to closed complaints.");
        // props.firebase.collection('posts').doc(userID)
        //         .collection('userPosts').doc(postID).get().then(document => {
        //           const fetchedPost = {
        //             id: document.id,
        //             ...document.data()
        //           };

        //         props.firebase.collection('posts').doc(userID)
        //        .collection('closedComplaints').doc(postID).set(fetchedPost);

        //        props.firebase.collection('posts').doc(userID)
        //        .collection('userPosts').doc(postID).delete(
        //          console.log("Deleted")
        //        ).catch(error =>
        //         console.error("Error removing post: ", error));

        //         });

    }

      if(choice == 1) {
        props.firebase.collection('posts').doc(userID)
                .collection('userPosts').doc(postID).set({
          status: 'Processing'
      }, { merge: true });
      }

    if(choice == 2) {
      props.firebase.collection('posts').doc(userID)
              .collection('userPosts').doc(postID).set({
        status: 'Assigned to Operator'
    }, { merge: true });
    }

  if(choice == 3) {
    props.firebase.collection('posts').doc(userID)
            .collection('userPosts').doc(postID).set({
      status: 'Work in Progress'
  }, { merge: true });
  }
  setReload(true);
};

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{props.row.title}</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        <p id="simple-modal-description">
         <b><i>Department: </i></b> {props.row.type[0]}
       </p>
       <p>
       <b><i>Location: </i></b> {props.row.location}
       </p>
       <p className="descriptionPadding">
       <b><i>Description: </i></b> {props.row.body}
       </p>
       <p>
       <b><i>Current Status: </i></b> {props.row.status}
       </p>
        <p>
            <i>Update Status: </i>
            <FormControl className={useStyles.formControl}>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      displayEmpty
                      className={useStyles.selectEmpty}
                      onChange={(event) => { updateTemp(props.row.user, props.row.id, event.target.value) }}
                    >
                      <MenuItem value={1}>Processing</MenuItem>
                      <MenuItem value={2}>Assigned to Operator</MenuItem>
                      <MenuItem value={3}>Work in Progress</MenuItem>
                      <MenuItem value={4}>Completed</MenuItem>
                    </Select>
                  </FormControl>
        </p>
        <p>
       <i>Reference ID: {props.row.id} </i>
       </p>
        </Grid>
        <Grid item xs={6}>
        {props.row.image &&
       <div>
           <img src={props.row.image} width="250" height="250"></img>
       </div>
       }
        </Grid>
        </Grid>
    </div>
  );

  return (
    <div>
    <IconButton onClick={handleOpen}>
        <MoreVertIcon />
     </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}