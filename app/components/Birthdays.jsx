import {
  faBirthdayCake,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CelebrateBirthDay from "./CelebrateBirthDay";
import { auth } from "@clerk/nextjs/server";

async function getTodayBirthdays(currentUserId) {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const userId = "%" + currentUserId + "%";
  const birthdays =
    await prisma.$queryRaw`SELECT * FROM "Birthday" u LEFT JOIN "User" p ON p.id = u."userId" WHERE EXTRACT(MONTH FROM "date") = ${month} AND EXTRACT(DAY FROM "date") = ${day} AND u."userId" NOT LIKE ${userId} `;

  return birthdays;
}

const Birthdays = async () => {
  const { userId: currentUserId } = auth();
  const birthdays = await getTodayBirthdays(currentUserId);

  return (
    <div className="rounded-lg bg-white p-4 shadow mt-4">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm text-gray-500">Birthdays</div>
      </div>
      {birthdays.map((user) => (
        <CelebrateBirthDay user={user} />
      ))}
      <div className="bg-slate-100 w-full p-4 mt-4 rounded-lg flex gap-3 items-center">
        <div className="text-gray-500">
          <FontAwesomeIcon icon={faBirthdayCake} width={18} height={18} />
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-700">
            Upcoming Birthdays
          </div>
          <div className="text-xs text-sm text-gray-400">
            See other 12 have upcoming birthdays.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Birthdays;
