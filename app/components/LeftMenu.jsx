import Image from "next/image";
import Link from "next/link";
import React from "react";
import Sponsor from "./Sponsor";
import { auth } from "@clerk/nextjs/server";
import prisma from "../../lib/client";

const links = [
  { icon: "picture", name: "My Posts", link: "" },
  { icon: "activity", name: "Activity", link: "" },
  { icon: "marketplace", name: "Marketplace", link: "" },
  { icon: "calendar", name: "Events", link: "" },
  { icon: "album", name: "Albums", link: "" },
  { icon: "video", name: "Videos", link: "" },
  { icon: "news", name: "News", link: "" },
  { icon: "course", name: "Courses", link: "" },
  { icon: "list", name: "Lists", link: "" },
  { icon: "options", name: "Settings", link: "" },
];

const LeftMenu = async ({ profile = false }) => {
  const { userId } = auth();

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  return (
    <div>
      {profile || (
        <div className="bg-white p-3 mb-3 rounded-lg">
          <div
            className="w-full relative rounded-lg bg-red-400 overflow-hidden"
            style={{ aspectRatio: 2.5 }}
          >
            <Image
              src={user.cover || "/img/noCover.png"}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col items-center -mt-5 z-50">
            <div className="h-10 w-10 rounded-full bg-red-200 z-50 relative overflow-hidden">
              <Image
                src={user.avatar || "/img/noAvatar.png"}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="font-semibold text-gray-600 capitalize">
              {user.name + " " + user.surname}
            </div>
            <div className="text-gray-500 text-xs">
              {user._count.followers} folllowers
            </div>
            <Link
              href={"/profile/" + user.username}
              className="bg-blue-500 p-1 px-3 text-sm mt-2 rounded text-white"
            >
              My Profile
            </Link>
          </div>
        </div>
      )}
      <div className="bg-white py-3 rounded-lg flex flex-col gap-1">
        {links.map((item) => (
          <Link
            href=""
            className="flex items-center gap-2 py-2 px-3 hover:bg-slate-100"
          >
            <Image
              src={"/img/" + item.icon + ".png"}
              alt=""
              width={16}
              height={16}
            />
            <span className="text-sm text-gray-600">{item.name}</span>
          </Link>
        ))}
      </div>
      <Sponsor left={true} />
    </div>
  );
};

export default LeftMenu;
