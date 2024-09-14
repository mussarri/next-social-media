"use client";
import React, { Suspense, useState } from "react";
import MakeComment from "./MakeComment";
import Image from "next/image";
import CommentActions from "./CommentActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteComment } from "../../lib/action";
import { motion } from "framer-motion";

const CommentList = ({ comments, postId, user }) => {
  const [commentList, setCommentList] = useState(comments);

  const submitDelete = async (deletedId) => {
    if (!user) return;
    if (!deletedId) {
      setCommentList((prev) => prev.slice(1));
      return;
    }
    try {
      await deleteComment(deletedId);
      setCommentList((prev) => prev.filter((i) => i.id !== deletedId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4">
      <MakeComment
        postId={postId}
        setCommentList={setCommentList}
        user={user}
      />
      <div className="pl-2">
        {commentList.map((i) => {
          const isLiked = i.likes?.map((item) => item.userId).includes(user.id);

          return (
            <motion.div
              initial={{ opacity: 0, x: -400, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 200, scale: 1.2 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="flex gap-3 mt-5 items-start"
            >
              <div className="h-8 min-w-8 w-8 bg-gray-500 rounded-full overflow-hidden relative">
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  src={i.user.avatar || "/img/noAvatar.png"}
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="font-semibold text-sm capitalize">
                  {i.user.name + " " + i.user.surname}
                </div>
                <div className="text-sm text-gray-500">{i.desc}</div>
                <CommentActions
                  commentId={i.id}
                  likeCount={i._count?.likes}
                  isLiked={isLiked}
                />
              </div>
              {(i.userId == user.id || user.id == i.post?.userId) && (
                <form action={() => submitDelete(i.id)}>
                  <button type={"submit"} className="text-red-400">
                    <FontAwesomeIcon
                      icon={faTrash}
                      width={13}
                      height={13}
                      color="currentcolor"
                    />
                  </button>
                </form>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;
