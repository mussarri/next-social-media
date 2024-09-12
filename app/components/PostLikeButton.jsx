"use client";
import React, { useOptimistic, useState } from "react";
import { faThumbsUp as solidfaThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { switchLike } from "../../lib/action";

const PostLikeButton = ({ post, isLiked }) => {
  const [postInfo, setPostInfo] = useState({
    liked: isLiked,
    count: post._count.likes,
  });

  const submit = async () => {
    optimisticFunc();
    try {
      await switchLike(post.id);
      setPostInfo(function (prev) {
        return {
          ...prev,
          liked: !prev.liked,
          count: prev.liked ? prev.count - 1 : prev.count + 1,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticState, optimisticFunc] = useOptimistic(
    postInfo,
    function (prev) {
      return {
        ...prev,
        liked: !prev.liked,
        count: prev.liked ? prev.count - 1 : prev.count + 1,
      };
    }
  );

  return (
    <div className="flex gap-2 text-sm text-gray-500 items-center">
      <form action={submit}>
        <button type="submit" className="text-blue-500">
          <FontAwesomeIcon
            icon={optimisticState.liked ? solidfaThumbsUp : faThumbsUp}
            width={16}
            height={16}
          />
        </button>
      </form>
      <div>|</div>
      <div>{optimisticState.count} Likes</div>
    </div>
  );
};

export default PostLikeButton;
