import { auth } from "@clerk/nextjs/server";
import React from "react";
import prisma from "../../lib/client";
import StoryList from "./StoryList";

const Stories = async () => {
  const { userId: currentUserId } = auth();

  let stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        },
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  stories = stories.map((story) => {
    return {
      ...story,
      count: 1,
    };
  });
  stories = stories.sort((a, b) => {
    return a.user.username > b.user.username;
  });
  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];
    console.log(stories);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-scroll scrollbar-hide">
      <div className="flex w-full gap-5 ">
        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
};

export default Stories;
