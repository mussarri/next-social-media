"use client";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import { addPost } from "../../lib/action";
import AddPostButton from "./AddPostButton";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState();

  if (!isLoaded) {
    return <span className="text-sm text-gray-400">Loading...</span>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-scroll scrollbar-hide mt-4">
      <div className="flex gap-4">
        <div className="w-10 h-10 bg-gray-500 rounded-full relative overflow-hidden">
          <Image
            src={user?.imageUrl || "/noAvatar.png"}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <form
          action={(formData) => {
            {
              if (!user) {
                window.location.reload();
                return;
              }
              addPost(formData, img?.secure_url || "");
            }
          }}
          className="flex-1"
        >
          <div className="flex gap-4">
            <textarea
              name="desc"
              id=""
              placeholder="What's on your mind?"
              className="flex-1 bg-gray-100 px-3 ronunded-lg text-sm outline-none pt-1"
            ></textarea>
            <AddPostButton />
          </div>
        </form>
      </div>
      <div className="flex gap-4 items-center mt-4 text-gray-4 text-xs pr-5 text-gray-500">
        <div className="flex gap-2">
          <CldUploadWidget
            uploadPreset="w8tuuc6a"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image src="/img/posts.png" alt="" width={20} height={20} />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>
        </div>
        <div className="flex gap-2">
          <Image src={"/img/video.png"} width={14} height={14} /> Video
        </div>
        <div className="flex gap-2">
          <Image src={"/img/list.png"} width={14} height={14} /> Poll
        </div>
        <div className="flex gap-2">
          <Image src={"/img/calendar.png"} width={14} height={14} /> Event
        </div>
      </div>
    </div>
  );
};

export default AddPost;
