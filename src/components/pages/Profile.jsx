import React from "react";
import { Aside } from "../organisms";
import { Text } from "../atoms";
import {DOM} from "../nanites";

const Profile = () => {
  return (
    <DOM.StyledContainer className="Profile">
      <Aside></Aside>
        <div
            style={{
                position: "absolute",
                left: "20vw",
                top: 0,
                height: "100vh",
                width: "calc(100% - 20vw)",
            }}>
            <Text.Title>Profile</Text.Title>
        </div>
    </DOM.StyledContainer>
  );
};

export default Profile;