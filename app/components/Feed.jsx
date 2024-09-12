import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";

const Feed = async ({ posts }) => {
  const { userId } = auth();
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  return (
    <div className="flex flex-col bg-white mt-6 gap-4 rounded-lg">
      {posts.map((post) => (
        <Post post={post} user={user} />
      ))}
    </div>
  );
};

export default Feed;
