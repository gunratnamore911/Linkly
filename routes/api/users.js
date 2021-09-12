const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
//   @api/users
router.post(
  "/",
  [
    check("name", "Name Is Required").not().isEmpty(),

    check("email", "Please Enter Email").isEmail(),

    check("password", "please Enter A Strong Password :)").isLength({ min: 2 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    //see if user exists
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Exist." }] });
      }
      //get users Gravatar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //encrypt pass

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jsonwebtoken

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
      /////////////////////////
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
