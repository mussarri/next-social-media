import React from "react";
import FriendRequestsList from "./FriendsRequestsList";

const FriendRequests = async ({ userId }) => {
  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm text-gray-500">
          Friend requests
        </div>
        <div className="text-xs text-blue-500">See all</div>
      </div>
      {requests.length > 0 ? (
        <FriendRequestsList requests={requests} />
      ) : (
        <span className="text-xs text-gray-400">No new request</span>
      )}
    </div>
  );
};

export default FriendRequests;
