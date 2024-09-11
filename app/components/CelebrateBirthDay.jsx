import Image from "next/image";
import React from "react";

const CelebrateBirthDay = ({ user }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-gray-500 relative overflow-hidden">
            <Image
              fill
              style={{ objectFit: "contain" }}
              src={user.avatar || "/img/noAvatar.png"}
            />
          </div>
          <div className="text-sm font-semibold capitalize">
            {user.name + " " + user.surname}
          </div>
        </div>
        <div className="text-sm p-1 bg-blue-500 text-white rounded px-2">
          Celebrate
        </div>
      </div>
    </div>
  );
};

export default CelebrateBirthDay;
