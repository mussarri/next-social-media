import { faBell, faComment, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const MobileMenu = () => {
  return (
    <div>
      <div className="flex gap-6 items-center">
        <ClerkLoading>...</ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <Link href={"/"}>
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
    </div>
  );
};

export default MobileMenu;
