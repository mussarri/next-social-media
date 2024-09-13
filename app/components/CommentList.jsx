"use client";
import React, { Suspense, useState } from "react";
import MakeComment from "./MakeComment";
import Image from "next/image";
import CommentActions from "./CommentActions";

const CommentList = ({ comments, postId }) => {
  const [commentList, setCommentList] = useState(comments);

  return (
    <div className="mt-4">
      <MakeComment postId={postId} setCommentList={setCommentList} />
      {commentList.map((i) => {
        const isLiked = i.likes?.map((item) => item.userId).includes(userId);

        return (
          <div className="flex gap-3 mt-5 items-start">
            <div className="h-8 min-w-8 w-8 bg-gray-500 rounded-full overflow-hidden relative">
              <Image
                fill
                style={{ objectFit: "contain" }}
                src={i.user.avatar || "/img/noAvatar.png"}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-sm capitalize">
                {i.user.name + " " + i.user.surname}
              </div>
              <div className="text-sm text-gray-500">{i.desc}</div>
              <CommentActions
                commentId={i.id}
                likeCount={i._count.likes}
                isLiked={isLiked}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
