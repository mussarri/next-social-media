import React, { Suspense } from "react";
import FriendRequests from "./FriendRequests";
import UserMediaCard from "./UserMediaCard";
import UserInfoCard from "./UserInfoCard";
import prisma from "../../lib/client";

const ProfileRightMenu = async ({ username }) => {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={"loading..."}>
        <UserInfoCard username={username} />
      </Suspense>
      <Suspense fallback={"loading..."}>
        <UserMediaCard user={user} />
      </Suspense>
      <Suspense fallback={"loading..."}>
        <FriendRequests user={user} />
      </Suspense>
    </div>
  );
};

export default ProfileRightMenu;
