import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useFormStatus } from "react-dom";

const StoryDelete = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "..." : <FontAwesomeIcon icon={faTrash} className="mr-5" />}
    </button>
  );
};

export default StoryDelete;
