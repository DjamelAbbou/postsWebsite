import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Index() {
  const { data } = useSession();
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
    author: data?.user.email,
  });
  console.log(postDetails);

  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <input
        placeholder="posts title"
        className="border border-gray-500 text-medium px-3 py-1 rounded-lg shadow-2xl"
        onChange={(e) =>
          setPostDetails((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      <textarea
        rows={10}
        cols={50}
        className="border border-gray-500 rounded-lg px-4 py-2 shadow-2xl"
        placeholder="Post content..."
        onChange={(e) =>
          setPostDetails((prev) => ({
            ...prev,
            content: e.target.value,
          }))
        }
      />
      <button
        onClick={() => {
          fetch("/api/add-post", {
            method: "POST",
            body: JSON.stringify({ ...postDetails }),
          });
        }}
        className="border border-red-400 text-white font-medium text-lg px-4 py-2 rounded-lg bg-red-800"
      >
        Add post
      </button>
    </main>
  );
}
