import Image from "next/image";
import React from "react";
import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-6 h-6 rounded-full flex items-center justify-center mt-auto"
    >
      {pending ? "..." : <Image src={"/img/send.png"} width={14} height={14} />}
    </button>
  );
};

export default AddPostButton;
