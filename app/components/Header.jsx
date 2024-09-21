import React from "react";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMinimize,
  faPlusCircle,
  faSearch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { faBell, faComment } from "@fortawesome/free-solid-svg-icons";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="bg-white shadow">
      <div className="h-24 flex items-center justify-between max-width">
        <Link
          href={"/"}
          className="logo font-bold text-xl text-blue-600 md:hidden lg:block w-[20%]"
        >
          Asegram
        </Link>
        <div className="hidden md:flex gap-6 text-gray-600 items-center w-[50%] justify-between">
          <div className="flex gap-6">
            <Link href={"/"} className="flex items-center gap-2 justify-start">
              <FontAwesomeIcon
                icon={faHome}
                width={16}
                height={16}
                className="text-gray-400"
              />
              Homepage
            </Link>
            <Link href={"/social"} className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faUsers}
                width={16}
                height={16}
                className="text-gray-400"
              />
              Friends
            </Link>
            <Link href={"/"} className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faPlusCircle}
                width={16}
                height={16}
                className="text-gray-400"
              />
              Stories
            </Link>
          </div>
          <div className="relative flex items-center justify-end rounded-2xl overflow-hidden md:hidden">
            <input
              type="text"
              name=""
              id=""
              placeholder="search..."
              className="px-2 py-1 text-sm bg-slate-100 w-full"
            />
            <FontAwesomeIcon
              icon={faSearch}
              width={14}
              height={14}
              className="absolute right-2 top-2"
            />
          </div>
        </div>
        <div className="w-[30%] flex justify-end">
          <div className="flex gap-6 items-center">
            <ClerkLoading>...</ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <Link href={"/social"}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    width={20}
                    height={20}
                    className="text-gray-400"
                  />
                </Link>
                <Link href={"/"}>
                  <FontAwesomeIcon
                    icon={faComment}
                    width={20}
                    height={20}
                    className="text-gray-400"
                  />
                </Link>
                <Link href={"/"}>
                  <FontAwesomeIcon
                    icon={faBell}
                    width={20}
                    height={20}
                    className="text-gray-400"
                  />
                </Link>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link href={"/sign-in"}>Login / Signup </Link>
              </SignedOut>
            </ClerkLoaded>
          </div>
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
