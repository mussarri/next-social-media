import Image from "next/image";
import React from "react";
import { useFormStatus } from "react-dom";

const MakeCommentButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="text-sm">
      {pending ? "..." : <Image src={"/img/send.png"} width={14} height={14} />}
    </button>
  );
};

export default MakeCommentButton;
