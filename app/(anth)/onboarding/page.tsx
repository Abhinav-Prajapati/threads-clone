import React from "react";
import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

// Note
const Page = async () => {
  const user = await currentUser();
  const userInfo = {};
  const userdata = {
    id: user?.id,
    objectId: userInfo?._id,
    userName: userInfo?.username || user?.username || "",
    bio: userInfo?.bio,
    image: userInfo?.image,
  };
  return (
    <main className=" max-w-3xl flex flex-col justify-start px-10 py-20 mx-auto">
      <h1 className=" head-text">Onbarding</h1>
      <p className="text-light-2 mt-3 text-base-regular">
        Create your profile and use threads now
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userInfo} btnTitle={"countinue....."} />
      </section>
    </main>
  );
};

export default Page;
