import Link from "next/link";
import React from "react";
import Image from "next/image";

import {
  UserButton,
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
} from "@clerk/nextjs";

const Topbar = () => {
  return (
    <nav className="topbar ">
      <Link href="/" className="flex gap-4 items-center">
        <Image src={"/assets/logo.svg"} height={28} width={28} alt="Logo" />
        <p className=" text-heading3-bold text-light-1 max-xs:hidden">
          Threads
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src={"/assets/logout.svg"}
                  height={24}
                  width={24}
                  alt="logout"
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <UserButton />
        {/* <OrganizationSwitcher
          appearance={{
            elements: {
              OrganizationSwitcherTrigger: { backgroundColor: "px-4 py-2" },
            },
          }}
        /> */}
      </div>
    </nav>
  );
};

export default Topbar;
