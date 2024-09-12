"use client";
import React, { useState } from "react";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { acceptFollow, rejectFollow } from "../../lib/action";

const FriendsRequestsList = ({ requests }) => {
  const [requestList, setRequestList] = useState(requests);
  const accept = async (userId) => {
    try {
      await acceptFollow(userId);
      setRequestList((prev) => prev.filter((i) => i.sender.id !== userId));
    } catch (error) {}
  };
  const reject = async (userId) => {
    try {
      await rejectFollow(userId);
      setRequestList((prev) => prev.filter((i) => i.sender.id !== userId));
    } catch (error) {}
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      {requestList.map((request) => (
        <div className="flex justify-between items-center">
          <Link
            href={"/profile/" + request.sender.username}
            className="flex gap-2 items-center"
          >
            <div className="w-8 h-8 rounded-full bg-gray-500 relative overflow-hidden">
              <Image fill src={request.sender.avataar || "/img/noAvatar.png"} />
            </div>
            <div className="text-sm font-semibold capitalize">
              {request.sender.name + " " + request.sender.surname}
            </div>
          </Link>
          <div className="flex gap-2">
            <form action={() => accept(request.sender.id)}>
              <button
                type="submit"
                className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-500 text-white"
              >
                <FontAwesomeIcon icon={faCheck} width={12} height={12} />
              </button>
            </form>
            <form action={() => reject(request.sender.id)}>
              <button
                type="submit"
                className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-200 text-gray-500"
              >
                <FontAwesomeIcon icon={faXmark} width={12} height={12} />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsRequestsList;
