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
            className="flex-1 bg-gray-100 px-3 ronunded-lg"
          ></textarea>
          <div className="w-6 h-6 rounded-full bg-gray-200 mt-auto">emoji</div>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-4 text-gray-4 justify-end pr-5 text-gray-500">
        <div>photo</div>
        <div>photo</div>
        <div>photo</div>
        <div>photo</div>
      </div>
    </div>
  );
};

export default AddPost;
