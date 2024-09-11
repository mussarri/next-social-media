import Image from "next/image";
import React from "react";

const AddPost = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-scroll scrollbar-hide mt-4">
      <div className="flex gap-4">
        <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
        <div className="flex gap-4 flex-1">
          <textarea
            name=""
            id=""
            placeholder="What's on your mind?"
            className="flex-1 bg-gray-100 px-3 ronunded-lg text-sm outline-none pt-1"
          ></textarea>
          <button className="w-6 h-6 rounded-full flex items-center justify-center mt-auto">
            <Image src={"/img/send.png"} width={14} height={14} />
          </button>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-4 text-gray-4 text-xs pr-5 text-gray-500">
        <div className="flex gap-2">
          <Image src={"/img/posts.png"} width={14} height={14} /> Photo
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
