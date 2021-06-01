import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";

const ChannelText = styled.div`
  font-size: 2em;
  font-family: "Hind";
  margin-right: 3vh;
  font-size: 1em;
  margin-left: 2vh;
  margin-top: 2vh;
`;

const Container = styled.div`
  border-right: 1px solid #3f37c9;
  height: 100vh;
`;

export default function SideBar(props: any) {
  const history = useHistory();
  const channelsData = props.channels;
  const channelsUpdated = channelsData as Array<any>;
  console.log("---", props.chan);
  console.log("channelsUpdated", channelsUpdated);
  return (
    <Container>
      {channelsUpdated.map((channel: any) => (
        <ChannelText
          onClick={() => {
            console.log(channel);
            console.log("setCurrentChannel", props.setCurrentChannel);
            props.setCurrentChannel(channel);
          }}
        >
          {channel}
        </ChannelText>
      ))}
    </Container>
  );
}
