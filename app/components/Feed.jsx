import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";

const Feed = async ({ username = "" }) => {
  const { userId: currentUserId } = auth();

  let posts;

  if (username) {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
    });
  } else {
    const user = await prisma.user.findFirst({
      where: {
        id: currentUserId,
      },
      include: {
        followings: true,
      },
    });

    const followingIds =
      user?.followings.length > 0
        ? user?.followings?.map((item) => item.followingId)
        : [];

    const ids = [user.id].concat(followingIds);

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      include: {
        user: true,
        likes: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
          take: 2,
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <div className="flex flex-col bg-white mt-6 gap-4 rounded-lg">
      {posts.map((post) => (
        <Post post={post} userId={userId} />
      ))}
    </div>
  );
};

export default Feed;
