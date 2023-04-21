import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Index() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  return (
    <main className="font-medium flex flex-col justify-center items-center gap-5">
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
          fetch("/api/sign-up", {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })
        }
      >
        Sign Up
      </button>
      <div className="text-gray-500">
        Already have an account?
        <button onClick={() => signIn()}>
          <span className="text-red-600 inline-block ml-2">Login here!</span>
        </button>
      </div>
    </main>
  );
}
