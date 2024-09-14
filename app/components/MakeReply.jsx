import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";

const MakeReply = ({ commentId, setRepliesList }) => {
  const [text, setText] = useState("");
  const { user, isLoaded } = useUser();

  const submit = async (formData) => {
    try {
      await createReply(formData, commentId);
      setRepliesList((prev) => [
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
    <>
      <form action={submit} className="mt-2">
        <div className="flex gap-3">
          <div className="h-6 w-6 bg-gray-500 rounded-full relative overflow-hidden">
            <Image fill src={user?.imageUrl || "/noAvatar.png"} />
          </div>
          <input
            type="text"
            className="flex-1 rounded-2xl bg-slate-100 px-3 py-1 outline-none text-xs"
            placeholder="Write a reply..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="text"
          />
          <button type="submit" className="text-sm">
            <Image src={"/img/send.png"} width={14} height={14} />
          </button>
        </div>
      </form>
    </>
  );
};

export default MakeReply;
