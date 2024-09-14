"use client";
import { useUser } from "@clerk/nextjs";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { deletePost } from "../../lib/action";
import PostDeleteButton from "./PostDeleteButton";

const PostDelete = ({ postId }) => {
  const { isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

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
      {isOpen && <PostDeleteButton />}
    </form>
  );
};
export default PostDelete;
