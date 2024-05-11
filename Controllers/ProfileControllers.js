const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const profileController = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await UserModel.findById(userInfo._id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const { name, email, phone } = user;

    res.status(200).json({ name, email, phone });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  profileController,
};
