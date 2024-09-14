import Image from "next/image";
import Stories from "./components/Stories";
import AddPost from "./components/AddPost";
import Feed from "./components/Feed";
import RightMenu from "./components/RightMenu";
import LeftMenu from "./components/LeftMenu";
import { auth } from "@clerk/nextjs/server";
import prisma from "../lib/client";

export default async function Home() {
  const { userId: currentUserId } = auth();
  const user = await prisma.user.findFirst({
    where: {
      id: currentUserId,
    },
    include: {
      followings: true,
    },
  });
  if (!user) return null;
  const followingIds =
    user?.followings.length > 0
      ? user?.followings?.map((item) => item.followingId)
      : [];
  const ids = [user.id].concat(followingIds);
  const posts = await prisma.post.findMany({
    where: {
      userId: {
        in: ids,
      },
    },
    include: {
      user: true,
      likes: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
        take: 2,
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-width py-5 flex gap-4">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <Stories />

        <AddPost />

        <Feed posts={posts} />
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
