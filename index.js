const express = require("express");
const fetch = require("node-fetch"); // Helius RPC 호출용
const app = express();
app.use(express.json());

// 기본 루트
app.get("/", (req, res) => {
  res.send("MVL API 작동 중!");
});

// 프로젝트별 라우터 연결
app.use("/api/mongmong", require("./routes/mongmong"));
app.use("/api/lump", require("./routes/lump"));
app.use("/api/clark", require("./routes/clark"));
app.use("/api/dindin", require("./routes/dindin"));
app.use("/api/perapera", require("./routes/perapera"));

// 예시: 공통 balance 확인 API
app.post("/api/get-balance", async (req, res) => {
  const { wallet } = req.body;
  const rpcUrl = "https://mainnet.helius-rpc.com/?api-key=34c90238-f34a-479d-b6c7-822e3ac476d4";

  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [wallet]
      })
    });

    const data = await response.json();
    const sol = data.result.value / 1e9;
    res.json({ wallet, balance: sol });
  } catch (err) {
    res.status(500).json({ error: "RPC 호출 실패", detail: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
