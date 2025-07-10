"use client";
import React, { useOptimistic, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { addStory } from "../../lib/action";
import StoryModal from "./StoryModal";

const StoryList = ({ stories, userId }) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState();
  const [isOpen, setIsOpen] = useState();
  const [active, setActive] = useState(0);

  const { user, isLoaded } = useUser();

  const add = async () => {
    try {
      const createdStory = await addStory(img.secure_url);
      setImg(null);
    } catch (err) {}
  };

  return (
    <>
      {isOpen && (
        <StoryModal
          close={() => setIsOpen(false)}
          story={stories[active]}
          setActive={setActive}
          setStoryList={setStoryList}
        />
      )}
      <CldUploadWidget
        uploadPreset="w8tuuc6a"
        onSuccess={(result, { widget }) => {
          setImg(result.info);

          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2 cursor-pointer relative">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full border text-3xl text-gray-400 overflow-hidden relative"
                onClick={open}
              >
                {img ? (
                  <Image src={img.secure_url} fill />
                ) : (
                  <span className="text-3xl mb-1">+</span>
                )}
              </div>
              {img ? (
                <form action={add}>
                  <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium text-sm ">Add a Story</span>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
      {storyList.map((story, index) => (
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          key={story?.id}
        >
          <div className="h-12 min-w-12 w-12 ring-2 bg-black rounded-full overflow-hidden relative">
            <Image
              fill
              style={{ objectFit: "contain" }}
              src={story?.user.avatar || "/img/noAvatar.png"}
              alt=""
              onClick={() => {
                setIsOpen(true), setActive(index);
              }}
            />
          </div>

          <span className="font-medium text-sm text-gray-600">
            {story?.user.username || story?.user.name}
          </span>
        </div>
      ))}
    </>
  );
};

export default StoryList;
