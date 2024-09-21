"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <>
      <div className="">
        <div className="md:hidden ml-6 mt-1 ">
          <div
            className="flex flex-col gap-[4.5px] cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div
              className={`w-6 h-1 bg-blue-500 rounded-sm ${
                isOpen ? "rotate-45" : ""
              } origin-left ease-in-out duration-500`}
            />
            <div
              className={`w-6 h-1 bg-blue-500 rounded-sm ${
                isOpen ? "opacity-0" : ""
              } ease-in-out duration-500`}
            />
            <div
              className={`w-6 h-1 bg-blue-500 rounded-sm ${
                isOpen ? "-rotate-45" : ""
              } origin-left ease-in-out duration-500`}
            />
          </div>
          {isOpen && (
            <div
              className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl"
              style={{ zIndex: 100 }}
            >
              <a
                className="cursor-pointer"
                onClick={() => {
                  router.push("/");
                  setIsOpen(false);
                }}
              >
                Home
              </a>
              <a
                className="cursor-pointer"
                onClick={() => {
                  router.push("/social");
                  setIsOpen(false);
                }}
              >
                Friends
              </a>
              <a
                className="cursor-pointer"
                onClick={() => {
                  router.push("/");
                  setIsOpen(false);
                }}
              >
                Groups
              </a>
              <a
                className="cursor-pointer"
                onClick={() => {
                  router.push("/");
                  setIsOpen(false);
                }}
              >
                Stories
              </a>
              <a
                className="cursor-pointer"
                onClick={() => {
                  router.push("/");
                  setIsOpen(false);
                }}
              >
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
