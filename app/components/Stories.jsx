import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import prisma from "../../lib/client";

const Stories = async () => {
  const { userId } = auth();

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      followers: true,
    },
  });
  const followingIds = user.followings
    ? user.followings?.map((item) => item.followingId)
    : [];
  const ids = followingIds.concat(user.id);
  const stories = await prisma.story.findMany({
    where: {
      userId: { in: ids },
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-scroll scrollbar-hide">
      <div className="flex w-full gap-5 ">
        {stories.length > 0 ? (
          stories.map((item) => (
            <div className=" flex flex-col">
              <div className="w-16 h-16 rounded-full bg-gray-500 relative overflow-hidden">
                <Image
                  src={item.user.avatar || "/img/noAvatar.png"}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="text-sm">{item.user.username}</span>
            </div>
          ))
        ) : (
          <span className="text-xs text-gray-400"> No stories found</span>
        )}
      </div>
    </div>
  );
};

export default Stories;
