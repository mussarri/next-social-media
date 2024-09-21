import {
  faCommentDots,
  faEllipsis,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { Suspense } from "react";
import Comments from "./Comments";
import Link from "next/link";
import PostLikeButton from "./PostLikeButton";
import PostDelete from "./PostDelete";
import prisma from "../../lib/client";

const Post = async ({ post, userId }) => {
  let isLiked;

  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
    },
    include: {
      user: true,
      likes: true,
      post: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
    take: 2,
    orderBy: {
      createdAt: "desc",
    },
  });
  const likes = post?.likes || [];
  if (likes.map((i) => i.userId).includes(userId)) {
    isLiked = true;
  } else {
    isLiked = false;
  }

  return (
    <div className="p-4 mb-4">
      <div className="flex justify-between items-center">
        <Link
          href={"/profile/" + post.user.username}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gray-500 rounded-full relative overflow-hidden">
            <Image fill src={post.user.avatar || "/img/noAvatar.png"} />
          </div>
          <div className="capitalize">
            {post.user.name + " " + post.user.surname}
          </div>
        </Link>
        {userId === post.user.id && <PostDelete postId={post.id} />}
      </div>
      {post.img && (
        <div
          className="w-full bg-black relative mt-4"
          style={{ aspectRatio: 4 / 3 }}
        >
          <Image src={post.img} fill style={{ objectFit: "contain" }} />
        </div>
      )}
      <div className="text-sm text-gray-700 mt-3">{post.desc}</div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-10 ">
          <PostLikeButton post={post} isLiked={isLiked} />
          <div className="flex gap-2 text-sm text-gray-500 items-center">
            <div className="text-blue-500">
              <FontAwesomeIcon icon={faCommentDots} width={16} height={16} />
            </div>
            <div>|</div>
            <div>{post._count.comments} Comments</div>
          </div>
        </div>
        <div className="text-blue-500">
          <FontAwesomeIcon icon={faShare} width={16} height={16} />
        </div>
      </div>
      <Comments
        comments={comments}
        postId={post.id}
        count={post._count.comments}
      />
    </div>
  );
};

export default Post;
