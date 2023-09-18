// Here (auth) is used to group the sign-in sgn-up and onboarding
// We made new layout.txs to handle all login stuff cuase we dont want
// to show navbar and stuff during signin ps
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
interface props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Threads",
  description: "A next.js 13 Threads clone",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: props) {
  return (
    <ClerkProvider>
      <html>
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
