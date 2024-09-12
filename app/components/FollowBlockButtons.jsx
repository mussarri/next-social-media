"use client";
import React, { useOptimistic, useState } from "react";
import { switchFollow, switchBlock } from "../../lib/action";

const FollowBlockButtons = ({
  isFollowing,
  isFollowRequestSent,
  isBlocked,
  userId,
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    followRequestSent: isFollowRequestSent,
    blocked: isBlocked,
  });

  const switchFollowSubmit = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followRequestSent:
          !prev.following && !prev.followRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const switchBlockSubmit = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value) =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followRequestSent:
              !state.following && !state.followRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked }
  );

  return (
    <>
      {" "}
      <form action={switchFollowSubmit}>
        <button
          type="submit"
          className="bg-blue-500 text-white text-sm mt-2  rounded p-1 w-full"
        >
          {optimisticState.following
            ? "Following"
            : optimisticState.followRequestSent
            ? "Follow Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={switchBlockSubmit}>
        <div className=" text-right">
          <button type="submit" className="text-red-500 text-xs">
            {optimisticState.blocked ? "Blocked" : "Block User"}
          </button>
        </div>
      </form>
    </>
  );
};

export default FollowBlockButtons;
