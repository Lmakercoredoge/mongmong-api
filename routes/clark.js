const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Clark 라우터 작동 중!");
});

module.exports = router;
