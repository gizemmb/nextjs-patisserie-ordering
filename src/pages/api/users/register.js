import dbConnect from "@/util/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  await dbConnect();
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    res.status(400).json({ message: "user already exists" });
    return;
  }
  try {
    const newUser = new User(body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default handler;
