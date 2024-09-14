import React from "react";
import { useFormStatus } from "react-dom";

const PostDeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      ref={ref}
      disabled={pending}
      className=" text-sm text-red-600 absolute z-50 w-max bg-red-400 hover:text-white rounded p-2 right-0 top-5"
    >
      {pending ? "..." : "Delete Post"}
    </button>
  );
};

export default PostDeleteButton;
