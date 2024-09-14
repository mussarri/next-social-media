"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { motion } from "framer-motion";
import { updateProfile } from "../../lib/action";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cover, setCover] = useState("");

  const router = useRouter();

  const [state, formAction] = useFormState(updateProfile, {
    success: false,
    error: false,
  });

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
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-2xl m-4 p-4 bg-white rounded">
              <div className="flex justify-between items-center">
                <h1 className="text-md font-medium">Update User</h1>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    state.success && router.refresh();
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faXmark} width={16} height={16} />{" "}
                </div>
              </div>
              <form
                className="flex flex-col gap-4 mt-3 grid grid-cols-2"
                action={(formData) =>
                  formAction({ formData, cover: cover?.secure_url || "" })
                }
              >
                <CldUploadWidget
                  uploadPreset="w8tuuc6a"
                  onSuccess={(result) => setCover(result.info)}
                >
                  {({ open }) => {
                    return (
                      <div
                        className="flex flex-col gap-4 my-4 col-span-2"
                        onClick={() => open()}
                      >
                        <label htmlFor="">Cover Picture</label>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Image
                            src={user.cover || "/img/noCover.png"}
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
                    );
                  }}
                </CldUploadWidget>
                <div className="flex flex-col gap-1 text-gray-600">
                  <label className="text-sm" htmlFor="name">
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
                  <label className="text-sm" htmlFor="surname">
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
                  <label className="text-sm" htmlFor="city">
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
                  <label className="text-sm" htmlFor="school">
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
                  <label className="text-sm" htmlFor="work">
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
                  <label className="text-sm" htmlFor="website">
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
                  <label className="text-sm" htmlFor="description">
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
                  <UpdateButton />
                </div>
              </form>
              {state.success && (
                <span className="text-green-500 text-sm">
                  Profile has been updated!
                </span>
              )}
              {state.error && (
                <span className="text-red-500 text-sm">
                  Something went wrong!
                </span>
              )}
            </div>
          </motion.div>
        </Modal>
      )}
    </div>
  );
};

export default UpdateUser;
