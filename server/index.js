const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "028a8b9e7516ac7863ea70178f65e0cc648925302f6df9c4f95edbc7ac7cea8efd": 100, // 795f7facbfcab6ce29cec0fc3086a59cd306335249290804c153f7e0a4e37804
  "03f61eea814b288d8f95d29bdcb1848ae2ecd5568ed3d032a94cf7c47891310d3b": 50, // 253da3362664902dd478e964b06a1c1d1aebd0481ba0853d45637c4ec7292e15
  "020649d483c86ed6544a395df032ff1b5f94f8bb4f823a63314f27cc5d69de25ec": 75, // d47d51ee82bc526a412231f9d0af50bdc75043d6aa2461b025161c5d4ce4c95d
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
