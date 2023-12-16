import express from 'express';

const router = express.Router();

//@route  GET /
//@desc   Landing Page
//@access Public
router.get("/", async (req, res) => {
  return res.send("Hello World");
});

module.exports = router;
