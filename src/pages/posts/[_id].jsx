import dbPromise, { jsonify } from "@/modules/db";
import { ObjectId } from "mongodb";
import { useSession } from "next-auth/react";
import removeEmail from "@/modules/remove-email";

export default function Index({ post }) {
  const { _id, title, content, author } = post;
  const { data } = useSession();

  return (
    <main className="flex flex-col justify-center items-center gap-5">
      <div>
        <span className="font-medium text-xl text-gray-500">
          {removeEmail(author)}
        </span>{" "}
        - <span className="font-medium text-xl text-gray-700">{title}</span>
      </div>
      <div className="max-w-[1000px] text-center">{content}</div>
      {data?.user.email === author ? (
        <button
          onClick={() =>
            fetch("/api/delete-post", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(_id),
            })
          }
          className="px-4 py-2 font-bold text-lg rounded-lg bg-red-700 border border-red-900 text-white uppercase fixed bottom-10 left-10"
        >
          delete post
        </button>
      ) : (
        ""
      )}
    </main>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.params;
  const objectId = new ObjectId(_id);

  const post = await (await dbPromise)
    .db()
    .collection("posts")
    .findOne({ _id: objectId });

  return {
    props: {
      post: jsonify(post),
    },
  };
}
