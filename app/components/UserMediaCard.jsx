import React from "react";

const UserMediaCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm text-gray-500">User Media</div>
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
  );
};

export default UserMediaCard;
