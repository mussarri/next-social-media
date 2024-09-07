import React from "react";

const Stories = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-scroll scrollbar-hide">
      <div className="flex w-full gap-5 ">
        {Array(13)
          .fill(0)
          .map((item) => (
            <div className=" flex flex-col">
              <div className="w-16 h-16 rounded-full bg-red-500"></div>
              <span className="text-sm">Username</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stories;
