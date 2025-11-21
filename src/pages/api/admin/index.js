import cookie from "cookie";

const handler = (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.ADMIN_TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
      );
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(400).json({ message: "Wrong Credentials" });
    }
  }
  if (method === "PUT") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        maxAge: -1,
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
    );
    return res.status(200).json({ message: "Success" });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
};
export default handler;
