import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { db } from "../firebase";
import NavBar from "../components/NavBar";

export default function HomePage() {
  const [channels, setChannels] = useState<Array<any>>([]);
  const user = firebase.auth().currentUser;
  const usersReference = db.collection("users");

  React.useEffect(() => {
    console.log("hi", channels);

    if (user) {
      const currentUserId = usersReference.doc(user.uid).id;
      console.log("currentUserId", currentUserId);
      usersReference
        .doc(currentUserId)
        .get()
        .then((doc) => {
          console.log("doc", doc.data());
          setChannels(doc?.data()?.channels);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [usersReference, channels, user]);

  return (
    <div>
      <NavBar />
      <Grid container>
        <Grid item xs={3}>
          {channels && channels.map((channel) => <div>{channel}</div>)}
        </Grid>
        <Grid item xs={9}>
          <div>feed</div>
        </Grid>
      </Grid>
    </div>
  );
}
