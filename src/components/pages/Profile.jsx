import React from "react";
import { Aside } from "../organisms";
import { Text } from "../atoms";

const Profile = () => {
  return (
    <div className="Profile">
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
    </div>
  );
};

export default Profile;