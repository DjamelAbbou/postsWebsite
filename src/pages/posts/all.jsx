import dbPromise, { jsonify } from "@/modules/db";
import removeEmail from "@/modules/remove-email";
import { useRouter } from "next/router";

export default function Index({ posts = [] }) {
  return (
    <main className="flex gap-5 flex-wrap justify-center items-center container mt-10">
      {posts.length !== 0 ? (
        posts.map((post, index) => <Post key={index} {...post} />)
      ) : (
        <div>No posts to show</div>
      )}
    </main>
  );
}

export function Post({ title, content, _id, author }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/posts/${_id}`)}
      className="hover:scale-105 hover:bg-blue-700 hover:text-white group transition-all border w-[23%] block py-2 px-4 border-gray-500 shadow-lg rounded-lg bg-gray-300 cursor-pointer"
    >
      <p className="font-medium text-xl mb-2">{title}</p>
      <p className="truncate overflow-hidden mb-10 text-gray-800 group-hover:text-white">
        {content}
      </p>
      <p className="font-medium text-xl">{removeEmail(author)}</p>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const posts = await (await dbPromise)
    .db("auth")
    .collection("posts")
    .find()
    .toArray();

  return {
    props: {
      posts: jsonify(posts),
    },
  };
}
