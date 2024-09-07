import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Sponsor = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow mt-4">
      <div className="flex justify-between items-center text-gray-500">
        <div className="font-semibold text-sm ">Sponsor Ads</div>
        <FontAwesomeIcon icon={faEllipsis} width={16} height={16} />
      </div>
      <div className="w-full relative" style={{ aspectRatio: 2 }}></div>
      <div className="text-blue-500 font-semibold text-sm">Ads Title</div>
      <div className="text-gray-400 text-xs mt-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quidem
        omnis saepe nihil at earum, officiis ea laboriosam illum debitis.
      </div>
      <button className="p-1 px-2 text-sm text-gray-600 bg-gray-100 mt-2 w-full rounded">Learn more</button>
    </div>
  );
};

export default Sponsor;
