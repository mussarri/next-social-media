import React, { Suspense } from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../lib/client";

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
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        {posts.map((post) => (
          <Post post={post} userId={currentUserId} />
        ))}
      </Suspense>
    </div>
  );
};

export default Feed;
