import {
  faCommentDots,
  faEllipsis,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
          <div>Jonh Doe</div>
        </div>
        <div>
          <FontAwesomeIcon icon={faEllipsis} width={16} height={16} />
        </div>
      </div>
      <div
        className="w-full bg-black relative mt-4"
        style={{ aspectRatio: 4 / 3 }}
      >
        <Image
          src={
            "https://cdn.pixabay.com/photo/2017/03/27/12/18/fields-2178329_1280.jpg"
          }
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="text-sm text-gray-700 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolore
        amet molestias atque quod placeat accusamus ea debitis alias pariatur?
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-10 ">
          <div className="flex gap-2 text-sm text-gray-500 items-center">
            <div className="text-blue-500">
              <FontAwesomeIcon icon={faThumbsUp} width={16} height={16} />
            </div>
            <div>|</div>
            <div>210 Likes</div>
          </div>
          <div className="flex gap-2 text-sm text-gray-500 items-center">
            <div className="text-blue-500">
              <FontAwesomeIcon icon={faCommentDots} width={16} height={16} />
            </div>
            <div>|</div>
            <div>21 Comments</div>
          </div>
        </div>
        <div className="text-blue-500">
          <FontAwesomeIcon icon={faShare} width={16} height={16} />
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
