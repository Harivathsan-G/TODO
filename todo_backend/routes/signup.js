require("dotenv").config();
const router = require("express").Router();
const { User, validate } = require("../models/user");
// const auth = require("../middleware/admin");
// const user = require("../middleware/user");
// const validObjectId = require("../middleware/validObjectId");
// const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");

//create user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(403).send({ message: "User already exists!!" });

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
  const hashPass = await bcrypt.hash(req.body.password, salt);

  let newUser = await new User({
    ...req.body,
    password: hashPass,
  }).save();

  newUser.password = undefined;
  newUser.__v = undefined;

  res
    .status(200)
    .send({ data: newUser, message: "New Account created successfully" });
});

module.exports = router;
//get all users
// router.get("/", admin, async (req, res) => {
//   const users = await User.find().select("-password -__v");
//   res.status(200).send({ data: users });
// });

//get user by id
// router.get("/:id", [validObjectId, auth], async (req, res) => {
//   const user = await User.findById(req.params.id).select("-password-__v");
//   res.status(200).send({ data: user });
// });

//update user
// router.put("/:id", [validObjectId, auth], async (req, res) => {
//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     { $set: req.body },
//     { new: true }
//   ).select(-password - __v);
//   res.status();
// });

//delete user
// router.delete("/:id", [validObjectId, admin], async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.status(200).send({ message: "Successfully deleted User" });
// });
