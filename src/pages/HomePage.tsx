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
import SideBar from "../components/SideBar";
import LinkFeed from "../components/LinkFeed";

export default function HomePage() {
  const [channels, setChannels] = useState<Array<any>>([]);
  const [allLinks, setAllLinks] = useState<Array<any>>([]);
  const [currentChannel, setCurrentChannel] = useState("");
  const user = firebase.auth().currentUser;
  const usersReference = db.collection("users");

  React.useEffect(() => {
    if (user) {
      const currentUserId = usersReference.doc(user.uid).id;
      console.log("currentUserId", currentUserId);
      db.collection("users")
        .doc(currentUserId)
        .get()
        .then((doc) => {
          console.log("doc", doc.data());
          setChannels(doc?.data()?.channels);
          //setCurrentChannel(channels[0]);
        })
        .catch((err) => {
          console.log(err);
        });

      db.collection("users")
        .doc(currentUserId)
        .collection("links")
        .get()
        .then((querySnapshot) => {
          let allLinksTemp: any = [];
          querySnapshot.forEach((doc) => {
            allLinksTemp.push(doc.data());
          });
          setAllLinks(allLinksTemp);
        });
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Grid container>
        <Grid item xs={3}>
          {channels && (
            <SideBar
              channels={channels}
              setCurrentChannel={setCurrentChannel}
            />
          )}
          {/* {channels && channels.map((channel) => <div>{channel}</div>)} */}
        </Grid>
        <Grid item xs={9}>
          <LinkFeed links={allLinks} />
        </Grid>
      </Grid>
    </div>
  );
}
