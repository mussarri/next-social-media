import React from "react";

const FollowBlockButtons = ({
  isFollowing,
  isFollowRequestSent,
  isBlocked,
}) => {
  return (
    <>
      {" "}
      <button className="bg-blue-500 text-white text-sm mt-2  rounded p-1">
        {isFollowing
          ? "Following"
          : isFollowRequestSent
          ? "Follow Request Sent"
          : "Follow"}
      </button>
      <div className=" text-right">
        <button className="text-red-500 text-xs">
          {isBlocked ? "Blocked" : "Block User"}
        </button>
      </div>
    </>
  );
};

export default FollowBlockButtons;
