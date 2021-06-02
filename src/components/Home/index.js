import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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


class HomePage extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
      dept: null,
      checkedArea: false,
      checkedViolation: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    const posts = [];
    const firstUserList = [];

    this.props.firebase.db.collection('users').get().
    then(response => {
      response.forEach(document => {
              const fetchedUser = {
                id: document.id,
                ...document.data()
              };
              firstUserList.push(Object.values(fetchedUser)[0]);
            })

            firstUserList.forEach(user => {
              this.props.firebase.db.collection('posts').doc(user).
              collection('userPosts').get()
                .then(response => {
                  response.forEach(document => {
                    const fetchedPost = {
                      id: document.id,
                      user: user,
                      ...document.data()
                    };
                    posts.push(fetchedPost);
                    this.props.firebase.db.collection('posts').doc(user)
                      .collection('userPosts').doc(fetchedPost.id).set({
                    user: user
                }, { merge: true });
                    // this.setState({
                    //   users: posts,
                    //   loading: false,
                    // });
                  });
                  this.searchByDept(13);
                  //console.log(posts);
                }).catch(error => {
                  console.log(error);
                });
              });
            }).catch(error => {
              console.log(error);
            });            
  }

  updateTemp(userID, postID, choice) {

    console.log(postID);

    // if(choice == 4) {
    //       console.log(userID);
    // this.setState({ users: this.state.users.filter(function(user) { 
    //   return user.id !== postID })});
    // }

      if(choice == 1) {
        this.props.firebase.db.collection('posts').doc(userID)
                .collection('userPosts').doc(postID).set({
          status: 'Processing'
      }, { merge: true });
      }

    if(choice == 2) {
      this.props.firebase.db.collection('posts').doc(userID)
              .collection('userPosts').doc(postID).set({
        status: 'Assigned to Operator'
    }, { merge: true });
    }

  if(choice == 3) {
    this.props.firebase.db.collection('posts').doc(userID)
            .collection('userPosts').doc(postID).set({
      status: 'Work in Progress'
  }, { merge: true });
  }
}

  updateStatus(userID, postID) { 

    this.props.firebase.db.collection('posts').doc(userID)
                .collection('userPosts').doc(postID).get().then(document => {
                  const fetchedPost = {
                    id: document.id,
                    ...document.data()
                  };

                this.props.firebase.db.collection('posts').doc(userID)
               .collection('closedComplaints').doc(postID).set(fetchedPost);

               this.props.firebase.db.collection('posts').doc(userID)
               .collection('userPosts').doc(postID).delete(
                 console.log("Deleted")
               ).catch(error => 
                console.error("Error removing post: ", error));

              this.setState({ users: this.state.users.filter(function(user) { 
                return user.id !== postID })});

                });        
  }


  searchByDept(choice) {
    var dept;
    switch(choice) {
      case 1: dept = "Electrical"; break;
      case 2: dept = "Encroachment"; break;
      case 3: dept = "Stray Dogs"; break;
      case 4: dept = "Garden"; break;
      case 5: dept = "Road"; break;
      case 6: dept = "Building Permission"; break;
      case 7: dept = "Water Supply"; break;
      case 8: dept = "Drainage"; break;
      case 9: dept = "Traffic"; break;
      case 10: dept = "Property Tax"; break;
      case 11: dept = "Garbage"; break;
      case 12: dept = "Health"; break;
      case 13: dept = false;
    }

    const posts = [];

    var postCollection = this.props.firebase.db.collectionGroup("userPosts");
    if(dept) {
    postCollection.where("type", "array-contains", dept).orderBy("creation", "desc").get()
    .then(response => {
      response.forEach(document => {
        const fetchedPost = {
          id: document.id,
          ...document.data()
        };
        posts.push(fetchedPost);
        this.setState({
          users: posts,
          loading: false,
        });
      })
    })
  }
  else {
    postCollection.orderBy("creation", "asc").get()
    .then(response => {
      response.forEach(document => {
        const fetchedPost = {
          id: document.id,
          ...document.data()
        };
        posts.push(fetchedPost);
        this.setState({
          users: posts,
          loading: false,
        });
      })
    })
  }
  }

//   handleCheckChange(event) {
//     const posts = [];
//     if(this.state.dept) {
//       var postCollecton = this.props.firebase.db.collectionGroup("userPosts");

//       if(event.target.name == "area") {
//         if(event.target.checked == true) {
//           if(this.checkedViolation) {
            
//             postCollecton.where("type", "array-contains", this.dept).
//             where("isCovidArea", "==", true).
//             where("isCovidViolation", "==", true)
//             .get()
//         .then(response => {
//       response.forEach(document => {
//         const fetchedPost = {
//           id: document.id,
//           ...document.data()
//         };
//         posts.push(fetchedPost);
//         this.setState({
//           users: posts,
//           loading: false,
//           checkedArea: true
//         });
//       })
//     })}

//     else {
//       postCollecton.where("type", "array-contains", this.dept).
//             where("isCovidArea", "==", true)
//             .get()
//         .then(response => {
//       response.forEach(document => {
//         const fetchedPost = {
//           id: document.id,
//           ...document.data()
//         };
//         posts.push(fetchedPost);
//         this.setState({
//           users: posts,
//           loading: false,
//         });
//       })
//     })
//     }
//     }
//     else {

//       if(this.checkedViolation) {
              
//         postCollecton.where("type", "array-contains", this.dept).
//         where("isCovidViolation", "==", true)
//         .get()
//     .then(response => {
//   response.forEach(document => {
//     const fetchedPost = {
//       id: document.id,
//       ...document.data()
//     };
//     posts.push(fetchedPost);
//     this.setState({
//       users: posts,
//       loading: false,
//     });
//   })
//   })}

//   else {
//   postCollecton.where("type", "array-contains", this.dept)
//         .get()
//     .then(response => {
//   response.forEach(document => {
//     const fetchedPost = {
//       id: document.id,
//       ...document.data()
//     };
//     posts.push(fetchedPost);
//     this.setState({
//       users: posts,
//       loading: false,
//     });
//   })
//   })
//   }
    
//   }
// }

//         if(event.target.name == "violation") {
//           if(event.target.checked == true) {
//             if(this.checkedArea) {
              
//               postCollecton.where("type", "array-contains", this.dept).
//               where("isCovidArea", "==", true).
//               where("isCovidViolation", "==", true)
//               .get()
//           .then(response => {
//         response.forEach(document => {
//           const fetchedPost = {
//             id: document.id,
//             ...document.data()
//           };
//           posts.push(fetchedPost);
//           this.setState({
//             users: posts,
//             loading: false,
//           });
//         })
//         })}

//         else {
//         postCollecton.where("type", "array-contains", this.dept).
//               where("isCovidViolation", "==", true)
//               .get()
//           .then(response => {
//         response.forEach(document => {
//           const fetchedPost = {
//             id: document.id,
//             ...document.data()
//           };
//           posts.push(fetchedPost);
//           this.setState({
//             users: posts,
//             loading: false,
//           });
//         })
//         })
//         }
//         }
//         else {

//         if(this.checkedArea) {
                
//           postCollecton.where("type", "array-contains", this.dept).
//           where("isCovidArea", "==", true)
//           .get()
//         .then(response => {
//         response.forEach(document => {
//         const fetchedPost = {
//         id: document.id,
//         ...document.data()
//         };
//         posts.push(fetchedPost);
//         this.setState({
//         users: posts,
//         loading: false,
//         });
//         })
//         })}

//         else {
//         postCollecton.where("type", "array-contains", this.dept)
//           .get()
//         .then(response => {
//         response.forEach(document => {
//         const fetchedPost = {
//         id: document.id,
//         ...document.data()
//         };
//         posts.push(fetchedPost);
//         this.setState({
//         users: posts,
//         loading: false,
//         });
//         })
//         })
//         }

//         }
//         }
//     }

//     else {
//       if(event.target.name == "area") {
//         if(event.target.checked == true) {
//           if(this.checkedViolation) {
            
//             postCollecton.where("isCovidArea", "==", true).
//             where("isCovidViolation", "==", true)
//             .get()
//         .then(response => {
//       response.forEach(document => {
//         const fetchedPost = {
//           id: document.id,
//           ...document.data()
//         };
//         posts.push(fetchedPost);
//         this.setState({
//           users: posts,
//           loading: false,
//         });
//       })
//     })}

//     else {
//       postCollecton.where("isCovidArea", "==", true)
//             .get()
//         .then(response => {
//       response.forEach(document => {
//         const fetchedPost = {
//           id: document.id,
//           ...document.data()
//         };
//         posts.push(fetchedPost);
//         this.setState({
//           users: posts,
//           loading: false,
//         });
//       })
//     })
//     }
//     }
//     else {

//       if(this.checkedViolation) {
              
//         postCollecton.where("isCovidViolation", "==", true)
//         .get()
//     .then(response => {
//   response.forEach(document => {
//     const fetchedPost = {
//       id: document.id,
//       ...document.data()
//     };
//     posts.push(fetchedPost);
//     this.setState({
//       users: posts,
//       loading: false,
//     });
//   })
//   })}

//   else {
//   postCollecton.get()
//     .then(response => {
//   response.forEach(document => {
//     const fetchedPost = {
//       id: document.id,
//       ...document.data()
//     };
//     posts.push(fetchedPost);
//     this.setState({
//       users: posts,
//       loading: false,
//     });
//   })
//   })
//   }
    
//   }
// }

//         if(event.target.name == "violation") {
//           if(event.target.checked == true) {
//             if(this.checkedArea) {
              
//               postCollecton.where("type", "array-contains", this.dept).
//               where("isCovidArea", "==", true).
//               where("isCovidViolation", "==", true)
//               .get()
//           .then(response => {
//         response.forEach(document => {
//           const fetchedPost = {
//             id: document.id,
//             ...document.data()
//           };
//           posts.push(fetchedPost);
//           this.setState({
//             users: posts,
//             loading: false,
//           });
//         })
//         })}

//         else {
//         postCollecton.where("type", "array-contains", this.dept).
//               where("isCovidViolation", "==", true)
//               .get()
//           .then(response => {
//         response.forEach(document => {
//           const fetchedPost = {
//             id: document.id,
//             ...document.data()
//           };
//           posts.push(fetchedPost);
//           this.setState({
//             users: posts,
//             loading: false,
//           });
//         })
//         })
//         }
//         }
//         else {

//         if(this.checkedArea) {
                
//           postCollecton.where("type", "array-contains", this.dept).
//           where("isCovidArea", "==", true)
//           .get()
//         .then(response => {
//         response.forEach(document => {
//         const fetchedPost = {
//         id: document.id,
//         ...document.data()
//         };
//         posts.push(fetchedPost);
//         this.setState({
//         users: posts,
//         loading: false,
//         });
//         })
//         })}

//         else {
//         postCollecton.where("type", "array-contains", this.dept)
//           .get()
//         .then(response => {
//         response.forEach(document => {
//         const fetchedPost = {
//         id: document.id,
//         ...document.data()
//         };
//         posts.push(fetchedPost);
//         this.setState({
//         users: posts,
//         loading: false,
//         });
//         })
//         })
//         }

//         }
//         }
//     }
//   }

  returnColor(dept) {
    if(dept === "Electrical")
      return "aliceblue";

    if(dept === "Encroachment")
      return "antiquewhite";

    if(dept === "Garden")
    return "#d1ffbd";

    if(dept === "Road")
    return "#d2cbaf";

    if(dept === "Stray Dogs")
    return "#e0dddd";

    if(dept === "Building Permission")
    return "#d9e3e5";

    if(dept === "Water Supply")
    return "#dcdbca";

    if(dept === "Drainage")
    return "#beb4ab";

    if(dept === "Traffic")
    return "#e9d3ba";

    if(dept === "Property Tax")
    return "#f1e4dc";

    if(dept === "Garbage")
    return "#f1e4dc"

    if(dept === "Health")
    return "#e6f9f1";

    else 
    return "white";
  
  }


  render() {
    const { users, loading, showDetails } = this.state;
 
    return (
      <div>
        <div className="titleCenter">
          <p>
        <Typography component="h4" variant="h4" color="primary" gutterBottom>
            Current Complaints
        </Typography>
        </p>
        </div>

        {loading && <div className="loading">
          <CircularProgress />
          </div>}

        {!loading && 
        <div>
        <div>
          <p>
        <Grid container spacing={3}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                  Search by Department: 
        <div className="tab">
        <FormControl className={useStyles.formControl}>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            displayEmpty
            className={useStyles.selectEmpty}
            onChange={(event) => { this.searchByDept(event.target.value) }}
          >
            <MenuItem value={1}>Electrical</MenuItem>
            <MenuItem value={2}>Encroachment</MenuItem>
            <MenuItem value={3}>Stray Dogs</MenuItem>
            <MenuItem value={4}>Garden</MenuItem>
            <MenuItem value={5}>Road</MenuItem>
            <MenuItem value={6}>Building Permission</MenuItem>
            <MenuItem value={7}>Water Supply</MenuItem>
            <MenuItem value={8}>Drainage</MenuItem>
            <MenuItem value={9}>Traffic</MenuItem>
            <MenuItem value={10}>Property Tax</MenuItem>
            <MenuItem value={11}>Garbage</MenuItem>
            <MenuItem value={12}>Health</MenuItem>
            <MenuItem value={13}>All</MenuItem>
          </Select>
        </FormControl>
        </div>
        </Grid>
        {/* <Grid item xs={3}>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox 
              checked={this.state.checkedArea} onChange={this.handleCheckChange} name="area" color="primary"/>}
            label="Covid Area"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedViolation}
                onChange={this.handleChange}
                name="violation"
                color="primary"
              />
            }
            label="Covid Violation"
          />
          </FormGroup>
        </Grid> */}
        </Grid>
        </p>
        </div>

        <div className={useStyles.root}> 
        <Grid container spacing={2}>
        <Grid item xs>
        </Grid>
        <Grid item xs={6}>
          <Paper className={useStyles.paper}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
              {/* <TableCell><div className="tableHead">Dept</div></TableCell> */}
              <TableCell><div className="tableHead">Location</div></TableCell>
              <TableCell><div className="tableHead">Title</div></TableCell>
              <TableCell><div className="tableHead">Date</div></TableCell>
              <TableCell><div className="tableHead"></div></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.id} style={{backgroundColor: this.returnColor(row.type[0])}}>
                  {/* <TableCell><div style={{backgroundColor: this.returnColor(row.type[0])}}>.</div></TableCell> */}
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.creation.toDate().toString().substring(0, row.creation.toDate().toString().lastIndexOf('G'))}</TableCell>
                  <TableCell>
                      <Demo row={row} firebase={this.props.firebase.db} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Paper>
        </Grid>
        <Grid item xs>
           USE COLOR LEGEND 
        </Grid>
      </Grid>
        </div>
        </div>
  }  
  </div> 
  
    );
  }
}

function preventDefault(event) {
  event.preventDefault();
}


export default withFirebase(HomePage);