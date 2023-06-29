import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState, useEffect } from "react";
import server from "./server";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleAddressChange = async () => {
    const {
      data: { balance },
    } = await server.get(`balance/${address}`);
    setBalance(balance);
  };

  useEffect(() => {
    if (address && address !== "") {
      handleAddressChange();
    } else {
      setBalance(0);
    }
  }, [address]);

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer setBalance={setBalance} address={address} />
    </div>
  );
}

export default App;
