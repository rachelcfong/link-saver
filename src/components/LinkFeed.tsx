import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import styled from "styled-components";
const LinkCard = styled.div`
  width: 50vh;
  padding: 3vh;
  border-width: 1px;
  border-color: #3f37c9;
  border-style: solid;
  border-radius: 15px;
  margin-top: 3vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleText = styled.div`
  font-family: "Hind";
  font-weight: bold;
  font-size: 2em;
  cursor: pointer;
  color: #3f37c9;
`;

const BodyText = styled.div`
  font-family: "Hind";
  font-size: 1em;
`;

const ChannelText = styled.div`
  font-family: "Hind";
  font-size: 1em;
  margin-top: 1vh;
  color: #787878;
`;

export default function LinkFeed(links: any) {
  const history = useHistory();

  const linksUpdated = links.links as Array<any>;
  console.log(linksUpdated);

  return (
    <Container>
      {linksUpdated.map((link: any) => (
        <LinkCard>
          <TitleText>
            <div onClick={() => window.open(link.url)}>{link.title}</div>
          </TitleText>
          <BodyText>{link.description}</BodyText>
          <ChannelText>from {link.channel}</ChannelText>
        </LinkCard>
      ))}
    </Container>
  );
}
