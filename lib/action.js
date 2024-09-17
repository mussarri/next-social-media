"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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

export const switchLikeComment = async (commentId) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("User is not authanticated!");

  try {
    const reqIsLikeExist = await prisma.like.findFirst({
      where: {
        commentId: commentId,
        userId: currentUserId,
      },
    });
    if (reqIsLikeExist) {
      await prisma.like.delete({
        where: {
          id: reqIsLikeExist.id,
        },
      });
    } else {
      const reqIsLikeExist = await prisma.like.create({
        data: {
          commentId: commentId,
          userId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occured!");
  }
};

export const deleteComment = async (commentId) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) throw new Error("User is not authanticated!");

  try {
    const reqComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
      include: {
        post: true,
      },
    });
    console.log(reqComment);

    if (
      currentUserId !== reqComment.userId &&
      currentUserId !== reqComment.post.userId
    ) {
      throw new Error("Not allowed!");
    }

    if (reqComment) {
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
    } else {
      throw new Error("Comment not found!");
    }
  } catch (error) {
    console.log(error);
    throw new Error("An error occured!");
  }
};

export const updateProfile = async (prevState, payload) => {
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    username: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse({ ...filteredFields });

  if (!validatedFields.success) {
    console.log("error");

    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = auth();

  if (!userId) {
    return { success: false, error: true };
  }

  try {
    cover
      ? await prisma.user.update({
          where: {
            id: userId,
          },
          data: { ...validatedFields.data, cover: cover },
        })
      : await prisma.user.update({
          where: {
            id: userId,
          },
          data: validatedFields.data,
        });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const addPost = async (formData, img) => {
  const desc = formData.get("desc");

  const Desc = z.string().min(1).max(255);

  const validatedDesc = Desc.safeParse(desc);


  if (!validatedDesc.success) {
    console.log("description is not valid");
    return;
  }
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId: userId,
        img: img,
      },
    });
    console.log("ok");

    revalidatePath("/");
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (postId) => {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated!");

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    if (!post) throw new Error("Post is not found!");
    if (post.userId !== userId) throw new Error("User is not authenticated!");
    await prisma.post.delete({
      where: {
        id: post.id,
      },
    });
    revalidatePath("/");
  } catch (error) {
    throw new Error("An error occured!");
  }
};
