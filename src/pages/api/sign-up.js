import dbPromise from "@/modules/db";

export default async function handler(req, res) {
  const { email, password } = await JSON.parse(req.body);

  const user = await (await dbPromise).db().collection("users").insertOne({
    email,
    password,
  });

  if (user.acknowledged) {
    res.status(200).json(user);
  }
}
