import FriendRequests from "./FriendRequests";
import Birthdays from "./Birthdays";
import Sponsor from "./Sponsor";
import React from "react";

const RightMenu = () => {
  return (
    <div>
      <FriendRequests />
      <Birthdays />
      <Sponsor />
    </div>
  );
};

export default RightMenu;
