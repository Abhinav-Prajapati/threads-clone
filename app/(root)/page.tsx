import { UserProfile } from "@clerk/nextjs";
import { auth, SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  console.log(userId);

  return (
    <main className="">
      <h1 className="head-text text-left">Home </h1>
    </main>
  );
}
