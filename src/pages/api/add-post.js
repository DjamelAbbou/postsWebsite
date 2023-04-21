import dbPromise from "modules/db";

export default async function Index(req, res) {
  const { title, content, author } = await JSON.parse(req.body);

  const post = await (await dbPromise).db().collection("posts").insertOne({
    title,
    content,
    author,
  });

  if (post.acknowledged) {
    return res.status(201).json({ post });
  }

  return res.status(500);
}
