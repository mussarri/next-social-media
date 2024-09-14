import React from "react";
import Image from "next/image";
import prisma from "../../lib/client";

const UserMediaCard = async ({ user }) => {
  const postsWithImg = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },

    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm text-gray-500">User Media</div>
        <div className="text-xs text-blue-500">See all</div>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-4">
        {postsWithImg.length > 0 &&
          postsWithImg.map((item) => (
            <div
              className="w-full relative rounded overflow-hidden"
              style={{ aspectRatio: 2 / 3 }}
            >
              <Image src={item.img} fill style={{ objectFit: "cover" }} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserMediaCard;
