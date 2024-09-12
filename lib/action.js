"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
//import { z } from "zod";
//import { revalidatePath } from "next/cache";

export const switchFollow = async (userId) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("User is not authanticated!");
  try {
    const reqIsFollowing = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
    if (reqIsFollowing) {
      await prisma.follower.delete({
        where: {
          id: reqIsFollowing.id,
        },
      });
    } else {
      const reqIsFollowReqSent = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (reqIsFollowReqSent) {
        await prisma.followRequest.delete({
          where: {
            id: reqIsFollowReqSent.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error ocured!");
  }
};

export const switchBlock = async (userId) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("User is not authanticated!");
  try {
    const reqIsBlocked = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });
    if (reqIsBlocked) {
      await prisma.block.findFirst({
        where: {
          id: reqIsBlocked.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error ocured!");
  }
};

export const acceptFollow = async (userId) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("User is not authanticated!");

  console.log(userId);

  try {
    const reqFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    if (reqFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: reqFollowRequest.id,
        },
      });
      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    } else {
      throw new Error("Following request not found!");
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occured");
  }
};

export const rejectFollow = async (userId) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("User is not authanticated!");

  try {
    const reqFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    if (reqFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: reqFollowRequest.id,
        },
      });
    } else {
      throw new Error("Following request not found!");
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occured");
  }
};

export const addPost = async () => {};

export const switchLike = async (postId) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("User is not authanticated");
  try {
    const reqIsPostLiked = await prisma.like.findFirst({
      where: {
        userId: currentUserId,
        postId: postId,
      },
    });
    if (reqIsPostLiked) {
      await prisma.like.delete({
        where: {
          id: reqIsPostLiked.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          userId: currentUserId,
          postId: postId,
        },
      });
    }
  } catch (error) {
    console.log(error);

    throw new Error("An error ocured!");
  }
};

export const createComment = async (formData, postId) => {
  const fields = Object.fromEntries(formData);
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );
  const text = filteredFields.text;
  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("User is not authanticated");
  try {
    await prisma.comment.create({
      data: {
        userId: currentUserId,
        postId: postId,
        desc: text,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("An error occured!");
  }
};
