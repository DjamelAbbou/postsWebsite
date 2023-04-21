import dbPromise, { jsonify } from "@/modules/db";
import { ObjectId } from "mongodb";
import removeEmail from "@/modules/remove-email";

export default function Index({ post }) {
  const { title, content, author } = post;
  return (
    <main className="flex flex-col justify-center items-center gap-5">
      <div>
        <span className="font-medium text-xl text-gray-500">
          {removeEmail(author)}
        </span>{" "}
        - <span className="font-medium text-xl text-gray-700">{title}</span>
      </div>
      <div className="max-w-[1000px] text-center">{content}</div>
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
