import React from 'react';
import { withFirebase } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';


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
  const [post, setPost] = React.useState([]);
  const [dept, setDept] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if(reload)
    window.location.reload();
  };

  const searchButton = (event) => {

    const docID = props.refID;

    const firstUserList = [];
    const posts = [];

    props.firebase.collection('users').get().
    then(response => {
      response.forEach(document => {
              const fetchedUser = {
                id: document.id,
                ...document.data()
              };
              firstUserList.push(Object.values(fetchedUser)[0]);
            })

            firstUserList.forEach(user => {
              props.firebase.collection('posts').doc(user).
              collection('closedComplaints').get()
                .then(response => {
                  response.forEach(document => {
                    const fetchedPost = {
                      id: document.id,
                      user: user,
                      ...document.data()
                    };

                    if(fetchedPost.id === docID) {
                    setDept(fetchedPost.type[0]);
                    setPost(fetchedPost);
                    setOpen(true);
                }
                  });
                  //console.log(posts);
                }).catch(error => {
                  console.log(error);
                });
              });
            }).catch(error => {
              console.log(error);
            });  

  event.preventDefault();

  };

  const restoreComplaint = (event) => {

    props.firebase.collection('posts').doc(post.user)
                .collection('closedComplaints').doc(props.refID).get().then(document => {
                  const fetchedPost = {
                    id: document.id,
                    ...document.data()
                  };

                  props.firebase.collection('posts').doc(post.user)
               .collection('userPosts').doc(props.refID).set(fetchedPost);

               props.firebase.collection('posts').doc(post.user)
               .collection('closedComplaints').doc(props.refID).delete(
                 console.log("Deleted")
               ).catch(error => 
                console.error("Error removing post: ", error));

                });        

    event.preventDefault();
  }


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{post.title}</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        <p id="simple-modal-description">
         <b><i>Department: </i></b> {dept}   
       </p>
       <p>
       <b><i>Location: </i></b> {post.location}
       </p>
       <p className="descriptionPadding">
       <b><i>Description: </i></b> {post.body}
       </p>
       <p>
       <b><i>Previous Status: </i></b> {post.status}
       </p>
        <p>
       <i>Reference ID: {props.refID} </i>
       </p>
       <Button variant="contained" color="primary" onClick={restoreComplaint}>
          Restore Complaint
       </Button>
        </Grid>
        <Grid item xs={6}>
        {post.image && 
       <div>
           <img src={post.image} width="250" height="250"></img>
       </div>
       }
        </Grid>
        </Grid>        
    </div>
  );

  return (
    <div>
    <Button variant="contained" color="primary" onClick={searchButton}>
      Search
    </Button>
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

