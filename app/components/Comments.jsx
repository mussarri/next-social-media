"use client";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import Image from "next/image";
import MakeComment from "./MakeComment";

const Comments = ({ comments, postId, count }) => {
  const [commentList, setCommentList] = useState(comments);
  return (
    <div className="mt-4">
      <MakeComment postId={postId} setCommentList={setCommentList} />
      {commentList.map((i) => (
        <div className="flex gap-4 mt-5 items-start">
          <div className="h-10 min-w-10 bg-gray-500 rounded-full overflow-hidden relative">
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
            <div className="flex gap-4 items-center mt-1">
              <FontAwesomeIcon icon={faThumbsUp} width={14} height={14} />
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-400">Reply</span>
            </div>
          </div>
        </div>
      ))}
      <div className="text-center text-sm text-gray-400 cursor-pointer">
        {count > 2 && <span>More comments</span>}
      </div>
    </div>
  );
};

export default Comments;
