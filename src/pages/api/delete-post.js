import { ObjectId } from "mongodb";
import dbPromise from "modules/db";

export default async function AddPost(req, res) {
  const _id = req.body;

  const deletedPost = await (
    await dbPromise
  )
    .db("auth")
    .collection("posts")
    .deleteOne({
      _id: ObjectId(_id),
    });

  if (deletedPost.acknowledged) {
    return res.status(204);
  }

  return res.status(500);
}
