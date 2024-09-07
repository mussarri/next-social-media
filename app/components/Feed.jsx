import React from "react";
import Post from "./Post";

const Feed = () => {
  return (
    <div className="flex flex-col bg-white mt-6 gap-4 rounded-lg">
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Feed;
