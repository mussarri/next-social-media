import React from "react";
import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="p-2 px-4 bg-blue-500 rounded text-white"
    >
      {pending ? "Submiting..." : "Submit"}
    </button>
  );
};

export default UpdateButton;
