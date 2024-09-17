import React, { Suspense } from "react";
import LeftMenu from "../../components/LeftMenu";
import RightMenu from "../../components/RightMenu";
import Image from "next/image";
import Feed from "../../components/Feed";
import ProfileRightMenu from "../../components/ProfileRightMenu";
import prisma from "../../../lib/client";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const page = async ({ params }) => {
  const { userId: currentUserId } = auth();

  const user = await prisma.user.findFirst({
    where: {
      username: params.username,
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

  if (!user) return notFound();

  const isBlocked = await prisma.block.findFirst({
    where: {
      blockerId: user.id,
      blockedId: currentUserId,
    },
  });

  if (isBlocked) return notFound();

  return (
    <div className="max-width py-5 flex gap-4">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu profile={true} />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div
          className="w-full relative overflow-hidden rounded-lg"
          style={{ aspectRatio: 2.5 }}
        >
          <Image
            src={user.cover || "/img/noCover.png"}
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="-mt-10 z-50 relative flex items-center flex-col">
          <div className="w-20 h-20 rounded-full bg-gray-300 z-50 border border-white relative overflow-hidden">
            <Image
              src={user.avatar || "/img/noAvatar.png"}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="text-gray-700 font-semibold text-center capitalize">
            {user.name + " " + user.surname}
          </div>
          <div className="flex gap-10 mt-2 ml-6">
            <div className="text-black text-xs flex flex-col items-center">
              <div className="font-semibold">{user._count.posts}</div>
              <div>Posts</div>
            </div>
            <div className="text-black text-xs flex flex-col items-center">
              <div className="font-semibold">{user._count.followers}</div>
              <div>Followers</div>
            </div>
            <div className="text-black text-xs flex flex-col items-center">
              <div className="font-semibold">{user._count.followings}</div>
              <div>Following</div>
            </div>
          </div>
        </div>
        <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
          <Feed username={params.username} />
        </Suspense>
      </div>
      <div className="hidden lg:block w-[30%]">
        <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
          <ProfileRightMenu username={params.username} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
