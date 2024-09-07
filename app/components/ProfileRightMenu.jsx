import {
  faBriefcase,
  faCalendar,
  faGraduationCap,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import FriendRequests from "./FriendRequests";

const ProfileRightMenu = () => {
  return (
    <div>
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-sm text-gray-500">
            User Information
          </div>
          <div className="text-xs text-blue-500">See all</div>
        </div>
        <div className="flex gap-2 items-center mt-4">
          <div className="font-semibold text-xl text-gray-600">John Doe</div>
          <div className="text-xs text-gray-400 mt-1">@johndoe</div>
        </div>
        <div className="text-sm text-gray-500 mt-4 w-fit">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
          blanditiis voluptatum tenetur consequatur sunt maxime ipsum, corporis
          consectetur voluptates quisquam!
        </div>
        <div className="text-sm text-gray-500 flex flex-col gap-3 mt-4">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faLocation} width={16} height={16} />
            <div className="">
              Living in <b>Istanbul</b>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faGraduationCap} width={16} height={16} />
            <div className="">
              Went to <b>Istanbul Lisesi</b>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBriefcase} width={16} height={16} />
            <div className="">
              Works at <b>Mercedes</b>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faCalendar} width={16} height={16} />
            <div className="">Joined September 2023</div>
          </div>
          <button className="bg-blue-500 text-white text-sm mt-2  rounded p-1">
            Following
          </button>
          <div className="text-red-500 text-right text-xs">Block user</div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-sm text-gray-500">
            User Media
          </div>
          <div className="text-xs text-blue-500">See all</div>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {Array(8)
            .fill(0)
            .map((item) => (
              <div
                className="w-full relative rounded overflow-hidden"
                style={{ aspectRatio: 2 / 3 }}
              >
                <Image
                  src={
                    "https://cdn.pixabay.com/photo/2017/03/27/12/18/fields-2178329_1280.jpg"
                  }
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
        </div>
      </div>
      <FriendRequests/> 
    </div>
  );
};

export default ProfileRightMenu;
