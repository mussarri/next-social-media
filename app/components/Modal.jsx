"use client";
import React, { useEffect } from "react";

const Modal = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  });

  return (
    <div className="w-screen h-screen bg-black/90 absolute top-0 left-0 z-50 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Modal;
