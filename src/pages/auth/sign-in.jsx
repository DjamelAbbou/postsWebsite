import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;
  return (
    <main className="font-medium flex flex-col justify-center items-center gap-5 min-h-[calc(100vh_-_304px)]">
      <input
        onChange={(e) =>
          setCredentials((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
        placeholder="Email"
        className=" border border-gray-500 text-medium px-3 py-1 rounded-lg"
      />
      <input
        onChange={(e) =>
          setCredentials((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
        placeholder="Password"
        className="border border-gray-500 text-medium px-3 py-1 rounded-lg"
      />
      <button
        className="border-2 px-4 py-1 rounded-lg shadow-xl text-gray-800"
        onClick={() =>
          signIn("credentials", {
            email,
            password,
            callbackUrl: "http://localhost:3000",
          })
        }
      >
        Login in
      </button>
    </main>
  );
}
