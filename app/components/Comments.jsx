import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import React from "react";

const Comments = ({ comments }) => {
  return (
    <div className="mt-4">
      <div className="flex gap-4">
        <div className="h-8 w-8 bg-gray-500 rounded-full"></div>
        <input
          type="text"
          className="flex-1 rounded-2xl bg-slate-100 px-3 py-1 outline-none text-xs"
          placeholder="Write a comment..."
        />
      </div>
      <div className="flex gap-4 mt-5 items-start">
        <div className="h-10 min-w-10 bg-gray-500 rounded-full"></div>
        <div className="flex flex-col gap-1 ">
          <div className="font-semibold text-sm">John Doe</div>
          <div className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolore
            ipsam cum? Mollitia quaerat nobis aperiam fugit cumque eos
            voluptatum laboriosam, quas ad vero!
          </div>
          <div className="flex gap-4 items-center mt-1">
            <FontAwesomeIcon icon={faThumbsUp} width={14} height={14} />
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-400">Reply</span>
          </div>
        </div>
        <div>
          <FontAwesomeIcon icon={faEllipsis} width={14} height={14} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
