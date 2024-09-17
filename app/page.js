import Image from "next/image";
import Stories from "./components/Stories";
import AddPost from "./components/AddPost";
import Feed from "./components/Feed";
import RightMenu from "./components/RightMenu";
import LeftMenu from "./components/LeftMenu";
 

export default async function Home() {
  return (
    <div className="max-width py-5 flex gap-4">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <Stories />

        <AddPost />

        <Feed />
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
