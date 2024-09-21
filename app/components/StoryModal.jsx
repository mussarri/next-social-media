import React, { useEffect, useRef } from "react";
import Modal from "./Modal";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faClose,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { motion } from "framer-motion";

const StoryModal = ({ close, story, setActive }) => {
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const prev = () => {
    if (active <= 0) {
      close();
    }
    setActive((prev) => prev - 1);
  };
  const next = () => {
    if (active >= Stories.length - 1) {
      close();
    }
    setActive((prev) => prev + 1);
  };

  var a = new Date();
  var b = new Date(story.createdAt);

  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(0);
    let minutes = (ms / (1000 * 60)).toFixed(0);
    let hours = (ms / (1000 * 60 * 60)).toFixed(0);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
    if (seconds < 60) return seconds + "s";
    else if (minutes < 60) return minutes + "m";
    else if (hours < 24) return hours + "h";
    else return days + " Days";
  }

  return (
    <Modal>
      <div className="text-white cursor-pointer" onClick={() => prev()}>
        <FontAwesomeIcon icon={faAngleLeft} width={16} height={16} />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        ref={ref}
        className="w-[400px] h-full max-h-[600px] bg-black m-4 p-4 rounded relative overflow-hidden"
      >
        <div className="z-50 absolute flex justify-between items-center left-4 w-[360px]">
          <Link
            href={"/profile/" + story.user.username}
            className="flex gap-3 items-center"
          >
            <Image
              alt=""
              src={story.img}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full"
              style={{ objectFit: "contain" }}
            />
            <div>
              <div className="text-white text-sm">{story.user.username}</div>
              <div className="text-xs text-gray-400">{msToTime(a - b)}</div>
            </div>
          </Link>
          <div onClick={close} className="text-white cursor-pointer">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <Image alt="" src={story.img} fill style={{ objectFit: "contain" }} />
      </motion.div>
      <div className="text-white cursor-pointer" onClick={() => next()}>
        <FontAwesomeIcon icon={faAngleRight} width={16} height={16} />
      </div>
    </Modal>
  );
};

export default StoryModal;
