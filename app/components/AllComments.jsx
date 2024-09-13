"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Modal from "./Modal";
import CommentActions from "./CommentActions";
import Image from "next/image";

const AllComments = ({ comments, userId }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="bg-gray-300 p-4 w-full rounded max-w-xl shadow h-full h-[70%]">
            <div className="flex justify-between items-center">
              <h1>Comments</h1>
              <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faXmark} width={16} height={16} />
              </div>
            </div>
            <div className="overflow-y-scroll h-[calc(100%-24px)]">
              {comments &&
                comments.map((i) => {
                  const isLiked = i.likes
                    ?.map((item) => item.userId)
                    .includes(userId);

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
          </div>
        </Modal>
      )}
    </>
  );
};

export default AllComments;
