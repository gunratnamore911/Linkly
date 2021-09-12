const express = require("express");

const router = express.Router();
const User = require("../../models/User");

const auth = require("../../middleware/auth");

const Links = require("../../models/Links");
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const newLink = new Links({
      name: user.name,
      user: req.user.id,
      link: req.body.link,
    });
    const linkbb = await newLink.save();
    res.json(linkbb);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

//get all links

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const links = await Links.find();
    const result = links.filter(function (e) {
      return e.user == user.id;
    });

    res.json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

//delete a link
router.delete("/:id", auth, async (req, res) => {
  try {
    const link = await Links.findById(req.params.id);

    if (link.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }
    await link.remove();
    res.json({ msg: "Link deleted " });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
