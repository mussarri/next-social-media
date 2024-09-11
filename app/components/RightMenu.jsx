import FriendRequests from "./FriendRequests";
import Birthdays from "./Birthdays";
import Sponsor from "./Sponsor";
import React from "react";
import { auth } from "@clerk/nextjs/server";

const RightMenu = () => {
  const { userId } = auth();

  return (
    <div>
      {userId && <FriendRequests userId={userId} />}
      <Birthdays />
      <Sponsor />
    </div>
  );
};

export default RightMenu;
