"use client";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "./Modal";
import CommentActions from "./CommentActions";
import Image from "next/image";
import { deleteComment } from "../../lib/action";
import { motion } from "framer-motion";

const AllComments = ({ comments, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [commentList, setCommentList] = useState(comments);
  const submitDelete = async (deletedId) => {
    if (!userId) return;
    try {
      await deleteComment(deletedId);
      setCommentList((prev) => prev.filter((i) => i.id !== deletedId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="text-center text-sm text-gray-400 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        More comments
      </div>
      {isOpen && (
        <Modal>
          <div className="bg-gray-100 p-4 w-full rounded max-w-xl shadow h-full h-[70%] max-h-[70%] ">
            <div className="flex justify-between items-center">
              <h1>Comments</h1>
              <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faXmark} width={16} height={16} />
              </div>
            </div>
            <div className="overflow-y-scroll h-[calc(100%-24px)] scrollbar-hide">
              {commentList &&
                commentList.map((i) => {
                  const isLiked = i.likes
                    ?.map((item) => item.userId)
                    .includes(userId);

                  return (
                    <motion.div
                      initial={{ opacity: 0, x: -400, scale: 0.5 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 200, scale: 1.2 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="flex gap-3 mt-5 items-start justify-between"
                    >
                      <div className="flex gap-3">
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
                      {(i.userId == userId || userId == i.post.userId) && (
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
        </Modal>
      )}
    </>
  );
};

export default AllComments;
