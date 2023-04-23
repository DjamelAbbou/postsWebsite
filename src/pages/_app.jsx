import "@/styles/globals.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

function AppWrapper({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <MyApp {...{ Component, pageProps }} />
    </SessionProvider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <div className="bg-gray-800 text-white mt-10">
      <div className="container py-10 flex flex-col gap-2">
        <div className="flex justify-center items-center">
          <div className="inline-block mr-1 text-lg font-medium hover:text-blue-400 transition-all">
            <Link href="/terms">Terms of Use </Link>
          </div>
          -
          <div className="inline-block ml-1 font-medium text-lg hover:text-blue-400 transition-all">
            <Link href="/policy"> Privacy Policy</Link>
          </div>
        </div>
        <div className="text-gray-400 text-center text-lg font-medium">
          Copyright © 2023 Djamel Abbou. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { data } = useSession();
  return (
    <header className="flex items-center justify-between container py-6">
      <div className="font-bold text-2xl">Auth.</div>
      <ul className="flex gap-10">
        <li className="font-semibold text-xl text-blue-700">
          <Link href="/">Home</Link>
        </li>
        <li className="font-semibold text-xl text-blue-700">
          <Link href="/posts/all">all-posts</Link>
        </li>
        <li className="font-semibold text-xl text-blue-700">
          {data ? (
            <button onClick={() => signOut()}>Sign out</button>
          ) : (
            <Link href="/sign-up">Sign Up</Link>
          )}
        </li>
      </ul>
    </header>
  );
}

export default AppWrapper;
