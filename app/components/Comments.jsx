import React from "react";
import CommentList from "./CommentList";
import prisma from "../../lib/client";
import AllComments from "./AllComments";
import { auth } from "@clerk/nextjs/server";

const Comments = async ({ comments, postId, count }) => {
  const allComments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
      post: true,
      likes: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const { userId } = auth();
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  return (
    <>
      <CommentList
        comments={comments}
        postId={postId}
        count={count}
        user={user}
      />
      {count > 2 && (
        <AllComments comments={allComments} userId={userId} user={user} />
      )}
    </>
  );
};

export default Comments;
