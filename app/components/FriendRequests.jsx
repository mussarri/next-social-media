import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const FriendRequests = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm text-gray-500">
          Friend requests
        </div>
        <div className="text-xs text-blue-500">See all</div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gray-500"></div>
            <div className="text-sm font-semibold">John Doe</div>
          </div>
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-500 text-white">
              <FontAwesomeIcon icon={faCheck} width={12} height={12} />
            </div>
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-200 text-gray-500">
              <FontAwesomeIcon icon={faXmark} width={12} height={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
