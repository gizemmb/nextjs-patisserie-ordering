import dbConnect from "@/util/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const handler = async (req, res) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  if (method === "PUT") {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.confirmPassword = await bcrypt.hash(
          req.body.confirmPassword,
          10
        );
      }
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  }
};

export default handler;
