import dbPromise, { jsonify } from "@/modules/db";
import removeEmail from "@/modules/remove-email";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// thing sthat help to get free of the fitnah of nisa
// tawheed
// mujahadat al nafs
// dua dua dua dua dua dua
// get out of the place of fitnah
// as soon as he say that the place is a place of fitnah, he raaaaaaaaan to the door,
// لا تستشرف لها و تبقى في كانك بل فر بدينك

export default function HomePage({ posts = [] }) {
  const { data } = useSession();
  const router = useRouter();

  return (
    <main>
      <div>
        <button
          onClick={() =>
            data ? router.push("/posts") : router.push("/sign-up")
          }
          className="hover:scale-105 transition-all  border border-blue-500 px-4 py-2 rounded-lg bg-blue-700 font-bold text-white"
        >
          New post
        </button>
      </div>
      <div className="flex mt-7 gap-5 flex-wrap justify-center items-center">
        {posts.length !== 0 ? (
          posts.map((post, index) => <Post key={index} {...post} />)
        ) : (
          <div>No posts to show</div>
        )}
      </div>
      <div className=" pt-5">
        <button
          onClick={() => router.push("/posts/all")}
          className="hover:scale-105 transition-all border mx-auto block border-blue-500 px-4 py-2 rounded-lg bg-blue-700 font-bold text-white"
        >
          All-posts
        </button>
      </div>
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
    .limit(8)
    .toArray();

  return {
    props: {
      posts: jsonify(posts),
    },
  };
}
