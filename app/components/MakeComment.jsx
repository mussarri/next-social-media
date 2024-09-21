"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { createComment } from "../../lib/action";
import MakeCommentButton from "./MakeCommentButton";
import { useRouter } from "next/navigation";

const MakeComment = ({ postId, setCommentList, user }) => {
  const [text, setText] = useState("");
  const { isLoaded } = useUser();
  const router = useRouter();
  const submit = async (formData) => {
    if (!text || !user) {
      return;
    }
    try {
      await createComment(formData, postId);

      setCommentList((prev) => [
        {
          user: {
            name: user.name,
            surname: user.surname,
            avatar: user.avatar || "/img/noAvatar.png",
          },
          post: {
            userId: user.id,
          },
          desc: text,
        },
        ...prev,
      ]);
      setText("");
      router.refresh();
    } catch (error) {}
  };

  if (!isLoaded) {
    return <span className="text-xs text-gray-400">Loading...</span>;
  }

  return (
    <form action={submit}>
      <div className="flex gap-4">
        <div className="h-8 w-8 bg-gray-500 rounded-full relative overflow-hidden">
          <Image fill src={user?.avatar || "/img/noAvatar.png"} />
        </div>
        <input
          type="text"
          className="flex-1 rounded-2xl bg-slate-100 px-3 py-1 outline-none text-xs"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
        />
        <MakeCommentButton />
      </div>
    </form>
  );
};

export default MakeComment;
