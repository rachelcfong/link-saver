import React, { useState } from "react";
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
import styled from "styled-components";
import { HeadingTwo } from "./Styles";

const NavigationBar = styled.div`
  background-color: #3a0ca3;
  height: 5vh;
  display: flex;
  justify-content: flex-start;
`;

const LogoText = styled.div`
  margin-left: 2vh;
  font-family: "Hind";
  font-size: 1.2em;
  color: white;
`;

const NavText = styled.div`
  font-size: 1em;
  font-family: "Hind";
  margin-right: 3vh;
  font-size: 1.2em;
  cursor: pointer;
  color: white;
`;

const NavTextBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 2;
  align-items: center;
`;

const LogoTextBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 2;
  align-items: center;
`;

export default function NavBar() {
  const history = useHistory();
  return (
    <NavigationBar>
      <LogoTextBox>
        <LogoText>ginsta yam</LogoText>
      </LogoTextBox>
      <NavTextBox>
        <NavText
          onClick={() => {
            history.push("/homepage");
          }}
        >
          🙂 profile
        </NavText>
        <NavText>📥 newsfeed</NavText>
        <NavText>✨ add new link</NavText>
      </NavTextBox>
    </NavigationBar>
  );
}
