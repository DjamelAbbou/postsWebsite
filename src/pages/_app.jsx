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
    <div className="px-20 pt-8 space-y-16">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export function Header() {
  const { data } = useSession();
  return (
    <header className="flex items-center justify-between">
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
