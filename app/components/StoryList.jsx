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
    if (!img?.secure_url) return;

    addOptimisticStory({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        username: "Sending...",
        avatar: user?.imageUrl || "/img/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdStory = await addStory(img.secure_url);
      setStoryList((prev) => [createdStory, ...prev]);
      setImg(null);
    } catch (err) {}
  };

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value) => [value, ...state]
  );

  return (
    <>
      {isOpen && (
        <StoryModal
          close={() => setIsOpen(false)}
          story={stories[active]}
          setActive={setActive}
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
                className="w-12 h-12 flex items-center justify-center rounded-full border text-3xl text-gray-400"
                onClick={open}
              >
                <span className="text-3xl mb-1">+</span>
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
      {optimisticStories.map((story, index) => (
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          key={story?.id}
        >
          <div className="h-12 min-w-12 w-12 ring-2 bg-black rounded-full overflow-hidden relative">
            <Image
              fill
              style={{ objectFit: "contain" }}
              src={story?.user.avatar || "/img/noAvatar.png"}
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
