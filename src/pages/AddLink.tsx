import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { db } from "../firebase";
import NavBar from "../components/NavBar";
import styled from "styled-components";

const Container = styled.div`
  justify-content: center;
  display: flex;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6vh;
  flex-direction: column;
  width: 50vh;
`;

const Heading = styled.div`
  font-size: 2em;
  font-family: "Hind";
  font-weight: bold;
  color: #f72585;
`;

const Message = styled.div`
  font-size: 1em;
  font-family: "Hind";
  color: #f72585;
  margin-top: 2vh;
`;

const ButtonWrapper = styled.div`
  margin-top: 2vh;
`;

export default function AddLink() {
  const user = firebase.auth().currentUser;
  const [url, setUrl] = useState("");
  const [channel, setChannel] = useState("");
  const [allChannels, setAllChannels] = useState<Array<any>>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  React.useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        setAllChannels(doc?.data()?.channels);
      });
  }, []);

  const handleSubmit = () => {
    let newChannels = allChannels;
    if (!allChannels.includes(channel)) {
      newChannels.push(channel);
    }
    db.collection("users")
      .doc(user?.uid)
      .collection("links")
      .add({
        url: url,
        channel: channel,
        title: title,
        description: description,
      })
      .then(() => {
        console.log("Success!");
        setUrl("");
        setChannel("");
        setTitle("");
        setDescription("");
        setMessage("Successfully posted!");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err);
      });

    db.collection("users").doc(user?.uid).update({
      channels: newChannels,
    });
  };

  return (
    <>
      <NavBar />
      <Container>
        <FormContainer>
          <Heading>what's new</Heading>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="url"
            label="url"
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="title"
            label="title"
            type="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            label="description"
            type="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="channel"
            label="channel"
            type="channel"
            id="channel"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          />
          <ButtonWrapper>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              post
            </Button>
          </ButtonWrapper>
          {message ? <Message>{message}</Message> : <></>}
        </FormContainer>
      </Container>
    </>
  );
}
