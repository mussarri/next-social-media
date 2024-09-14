"use client";
import React, { useOptimistic, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as solidFaThumsUp } from "@fortawesome/free-solid-svg-icons";
import { switchLikeComment } from "../../lib/action";

const CommentActions = ({ commentId, likeCount, isLiked }) => {
  const [state, setState] = useState({
    liked: isLiked,
    count: likeCount,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [replyList, setRepliesList] = useState([]);

  const submit = async () => {
    optimisticFunc();
    try {
      await switchLikeComment(commentId);
      setState((state) => {
        return {
          ...state,
          liked: !state.liked,
          count: state.liked ? state.count - 1 : state.count + 1,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticState, optimisticFunc] = useOptimistic(state, (state) => {
    return {
      ...state,
      liked: !state.liked,
      count: state.liked ? state.count - 1 : state.count + 1,
    };
  });

  return (
    <>
      <div className="flex gap-4 items-center mt-1">
        <form action={submit} className="cursor-pointer">
          <button type="submit" className=" text-xs flex gap-1 items-center">
            <FontAwesomeIcon
              icon={optimisticState.liked ? solidFaThumsUp : faThumbsUp}
              width={14}
              height={14}
            />
            {optimisticState.count}
          </button>
        </form>
        {/* <span className="text-xs text-gray-400">|</span>
        <span
          className="text-xs text-gray-400 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Reply
        </span> */}
      </div>
    </>
  );
};

export default CommentActions;
