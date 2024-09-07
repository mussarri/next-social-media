import {
  faBirthdayCake,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Birthdays = () => {
  return (
    <div className="rounded-lg bg-white p-4 shadow mt-4">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm text-gray-500">Birthdays</div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gray-500"></div>
            <div className="text-sm font-semibold">John Doe</div>
          </div>
          <div className="text-sm p-1 bg-blue-500 text-white rounded px-2">
            Celebrate
          </div>
        </div>
      </div>
      <div className="bg-slate-100 w-full p-4 mt-4 rounded-lg flex gap-3 items-center">
        <div className="text-gray-500">
          <FontAwesomeIcon icon={faBirthdayCake} width={18} height={18} />
        </div>
        <div>
            <div className="text-xs font-semibold text-gray-700">Upcoming Birthdays</div>
            <div className="text-xs text-sm text-gray-400">See other 12 have upcoming birthdays.</div>
        </div>
      </div>
    </div>
  );
};

export default Birthdays;
