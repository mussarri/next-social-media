import { auth } from "@clerk/nextjs/server";
import React from "react";
import prisma from "../../lib/client";
import LeftMenu from "../components/LeftMenu";
import Image from "next/image";
import Link from "next/link";
import FollowBlockButtons from "../components/FollowBlockButtons";

const page = async () => {
  const { userId: currentUserId } = auth();

  const me = await prisma.user.findFirst({
    where: {
      id: currentUserId,
    },
    include: {
      followings: true,
    },
  });

  const users = await prisma.user.findMany({
    where: {
      //id: {
      //not: currentUserId,
      //},
      followers: {
        none: {
          followerId: currentUserId,
        },
      },
    },
    include: {
      followings: true,
      _count: {
        select: {
          followers: true,
          followings: true,
        },
      },
    },
  });

  if (!users) {
    return null;
  }

  return (
    <div className="max-width py-5 flex gap-4">
      <div className="hidden lg:block w-[20%]">
        <LeftMenu />
      </div>
      <div className="w-full w-full lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {users &&
          users.map((user) => {
            const myFollowings = me.followings.map((i) => i.followerId);
            const sameFollowings = user.followings.filter((i) =>
              myFollowings.includes(i.followerId)
            );

            return (
              <Link
                href={"/profile/" + user.username}
                className="w-full h-fit rounded shadow overflow-hidden"
              >
                <div
                  className="relative w-full bg-black"
                  style={{ aspectRatio: 3 / 3 }}
                >
                  <Image
                    src={user.avatar || "/img/noAvatar.img"}
                    fill
                    alt=""
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="px-3 py-1 text-gray-800 text-sm">
                  {" "}
                  {user.name + " " + user.surname}
                </div>
                <div className="px-3 pb-1 text-gray-800 text-xs">
                  {" "}
                  {"@" + user.username}
                </div>
                {/* <div className="px-3 pb-3 text-gray-800 text-xs flex justify-between">
                  <div className="flex flex-col items-center">
                    <div className="text-black">{user._count.followings}</div>
                    <div className="text-xs">Followers</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-black">
                      {sameFollowings.length > 0 ? sameFollowings.length : 0}
                    </div>
                    <div className="text-xs">Common</div>
                  </div>
                </div> */}
                <div className={"px-3 pb-2"}>
                  <button className="bg-blue-500 rounded text-sm text-white w-full py-1 px-2">
                    Follow
                  </button>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default page;
