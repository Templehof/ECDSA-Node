import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, privateKey, setPrivateKey }) {
  async function onPrivateKeyChange(evt) {
    console.log("Kek");
    const key = evt.target.value;
    setPrivateKey(key);
    try {
      if (key !== "") {
        setAddress(toHex(secp256k1.getPublicKey(privateKey)));
      }
    } catch (error) {
      setAddress("Ivalid key");
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <p>Address: {address}</p>
      <p>Key: {privateKey}</p>

      <label>
        Private Key
        <input
          placeholder="Type your private key"
          value={privateKey}
          onChange={onPrivateKeyChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
