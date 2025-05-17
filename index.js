const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MONGMONG API 작동 중!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
