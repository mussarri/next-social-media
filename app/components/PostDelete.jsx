"use client";
import { useUser } from "@clerk/nextjs";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { deletePost } from "../../lib/action";

const PostDelete = ({ postId }) => {
  const { isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!isLoaded) {
    return <span className="text-sm text-gray-400">Loading...</span>;
  }
  return (
    <form
      action={() => {
        deletePost(postId);
        setIsOpen(false);
      }}
      className="relative"
    >
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faEllipsis} width={16} height={16} />
      </div>
      {isOpen && (
        <button
          type="submit"
          className=" text-sm text-red-600 absolute z-50 w-max bg-red-400 hover:text-white rounded p-2 right-0 top-5"
        >
          Delete Post
        </button>
      )}
    </form>
  );
};
export default PostDelete;
