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

  return (
    <>
      <CommentList
        comments={comments}
        postId={postId}
        count={count}
        userId={userId}
      />
      {count > 2 && <AllComments comments={allComments} userId={userId} />}
    </>
  );
};

export default Comments;
