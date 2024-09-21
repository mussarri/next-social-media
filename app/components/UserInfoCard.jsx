import React from "react";
import {
  faBriefcase,
  faCalendar,
  faGraduationCap,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FollowBlockButtons from "./FollowBlockButtons";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../lib/client";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ username }) => {
  const { userId: currentUserId } = auth();

  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          posts: true,
          followings: true,
        },
      },
    },
  });
  const date = new Date(user?.createdAt);
  const formattedDate = date?.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
  if (!user) return null;

  let isFollowing = false;
  let isFollowRequestSent = false;
  let isBlocked = false;

  if (!currentUserId) return null;

  try {
    const reqIsFollowing = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    if (reqIsFollowing) {
      isFollowing = true;
    } else {
      const reqIsFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: user.id,
        },
      });
      if (reqIsFollowRequest) isFollowRequestSent = true;
    }

    const reqIsBlockRequest = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });
    if (reqIsBlockRequest) isBlocked = true;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm text-gray-500">
          User Information
        </div>
        {currentUserId !== user.id ? (
          <div className="text-xs text-blue-500">See all</div>
        ) : (
          <UpdateUser user={user} />
        )}
      </div>
      <div className="flex gap-2 items-center mt-4">
        <div className="font-semibold text-xl text-gray-600 capitalize">
          {user.name + " " + user.surname}
        </div>
        <div className="text-xs text-gray-400 mt-1">@{user.username}</div>
      </div>
      <div className="text-sm text-gray-500 mt-4 w-fit">{user.description}</div>
      <div className="text-sm text-gray-500 flex flex-col gap-3 mt-4">
        {user.city && (
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faLocation} width={16} height={16} />
            <div className="">
              Living in <b>{user.city}</b>
            </div>
          </div>
        )}
        {user.school && (
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faGraduationCap} width={16} height={16} />
            <div className="">
              Went to <b>{user.school}</b>
            </div>
          </div>
        )}
        {user.work && (
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBriefcase} width={16} height={16} />
            <div className="">
              Works at <b>{user.work}</b>
            </div>
          </div>
        )}
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faCalendar} width={16} height={16} />
          <div className="">Joined {formattedDate}</div>
        </div>
        {user.id !== currentUserId && (
          <FollowBlockButtons
            isBlocked={isBlocked}
            isFollowRequestSent={isFollowRequestSent}
            isFollowing={isFollowing}
            userId={user.id}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
