"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { motion } from "framer-motion";

const UpdateUser = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <span
        className="text-xs text-blue-500 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Update
      </span>
      {isOpen && (
        <Modal>
          <div>
            <div className="w-full max-w-2xl m-4 p-4 bg-white rounded">
              <div className="flex justify-between items-center">
                <h1 className="text-md font-medium">Update User</h1>
                <div
                  className="cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {" "}
                  <FontAwesomeIcon icon={faXmark} width={16} height={16} />{" "}
                </div>
              </div>
              <form
                action=""
                className="flex flex-col gap-4 mt-3 grid grid-cols-2"
              >
                <div className="flex flex-col gap-4 col-span-2">
                  <label htmlFor="">Cover Picture</label>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src={user.cover || "/noCover.png"}
                      alt=""
                      width={48}
                      height={32}
                      className="w-12 h-8 rounded-md object-cover"
                    />
                    <span className="text-xs underline text-gray-600">
                      Change
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-gray-600">
                  <label className="text-sm" htmlFor="username">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={user.name}
                    className="rounded p-2 border border-gray-200 text-sm "
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-600">
                  <label className="text-sm" htmlFor="username">
                    Surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    placeholder={user.surname}
                    className="rounded p-2 border border-gray-200 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1 text-gray-600">
                  <label className="text-sm" htmlFor="username">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder={user.city}
                    className="rounded p-2 border border-gray-200 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-600">
                  <label className="text-sm" htmlFor="username">
                    School
                  </label>
                  <input
                    type="text"
                    name="school"
                    placeholder={user.school}
                    className="rounded p-2 border border-gray-200 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-600">
                  <label className="text-sm" htmlFor="username">
                    Work
                  </label>
                  <input
                    type="text"
                    name="work"
                    placeholder={user.work}
                    className="rounded p-2 border border-gray-200 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-600">
                  <label className="text-sm" htmlFor="username">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    placeholder={user.website}
                    className="rounded p-2 border border-gray-200 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-600">
                  <label className="text-sm" htmlFor="username">
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder={user.description}
                    className="rounded p-2 border border-gray-200 text-sm"
                  />
                </div>

                <div></div>
                <div className="col-span-2 text-right">
                  <button
                    type="submit"
                    className="p-2 px-4 bg-blue-500 rounded text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UpdateUser;
