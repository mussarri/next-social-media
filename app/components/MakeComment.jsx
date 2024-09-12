"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { createComment } from "../../lib/action";

const MakeComment = ({ postId, setCommentList }) => {
  const [text, setText] = useState("");
  const { user, isLoaded } = useUser();

  const submit = async (formData) => {
    try {
      await createComment(formData, postId);
      setCommentList((prev) => [
        ...prev,
        {
          user: { name: user.firstName, lastname: user.lastName, avatar: "" },
          desc: text,
        },
      ]);
      setText("");
    } catch (error) {}
  };

  if (!isLoaded) {
    return <span className="text-xs text-gray-400">Loading...</span>;
  }

  return (
    <form action={submit}>
      <div className="flex gap-4">
        <div className="h-8 w-8 bg-gray-500 rounded-full relative overflow-hidden">
          <Image fill src={user?.imageUrl || "/noAvatar.png"} />
        </div>
        <input
          type="text"
          className="flex-1 rounded-2xl bg-slate-100 px-3 py-1 outline-none text-xs"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
        />
        <button type="submit" className="text-sm">
          Send
        </button>
      </div>
    </form>
  );
};

export default MakeComment;
