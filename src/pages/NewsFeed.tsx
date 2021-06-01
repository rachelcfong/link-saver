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
import LinkFeed from "../components/LinkFeed";

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

export default function NewsFeed() {
  const [allLinks, setAllLinks] = useState<Array<any>>([]);
  React.useEffect(() => {
    db.collection("newsfeed")
      .get()
      .then((querySnapshot) => {
        let allLinksTemp: any = [];
        querySnapshot.forEach((doc) => {
          allLinksTemp.push(doc?.data());
        });
        setAllLinks(allLinksTemp);
      });
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <LinkFeed links={allLinks} />
      </Container>
    </>
  );
}
