import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex justify-center items-center" style={{height: "calc(100% - 96px)"}}>
      <SignIn />{" "}
    </div>
  );
}
