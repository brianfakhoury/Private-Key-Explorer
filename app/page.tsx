"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { abbreviateAddress, validateHex, validatePkLength } from "./utils";

import styles from "../styles/Home.module.css";
import "../styles/globals.css";

const HistoryTable = ({ history }) => (
  <table className={styles.table}>
    <tbody>
      <tr>
        <th>Private Key</th>
        <th>Address</th>
      </tr>
      {history.map((e, i) => (
        <tr key={i}>
          <td>{e[0]}</td>
          <td>
            <a
              target="_blank"
              rel="noreferrer"
              href={"https://etherscan.io/address/" + e[1]}
            >
              {abbreviateAddress(e[1])}
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default function Page() {
  const [text, setText] = useState(
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  );

  const [history, setHistory] = useState([
    [
      "0x0000000000000000000000000000000000000000000000000000000000000001",
      "0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf",
    ],
  ]);

  const pushToHistory = (pk, address) =>
    !history.reduce(
      (prev, curr) => curr[0] === pk || prev,
      history[0] === pk
    ) && setHistory([[pk, address], ...history]);

  const pk2wallet = (pk) => {
    try {
      if (pk.length < 66) {
        throw new Error("too short");
      }
      const signer = new ethers.SigningKey(pk);
      const public_key = signer.publicKey;
      const keccak_hash = ethers.keccak256(ethers.dataSlice(public_key, 1))
      const address = "0x" + keccak_hash.slice(-40);
      pushToHistory(pk, address);
      return address;
    } catch (e) {
      console.log(e);
    }
  };

  const current_address = pk2wallet(text);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Explore Private Keys 👨🏽‍💻🔎</h1>
        </header>

        <div className={styles.input}>
          <h3>Enter Private Key String</h3>
          <textarea
            onChange={(e) =>
              e.target.value.startsWith("0x")
                ? setText(e.target.value)
                : setText("0x" + e.target.value)
            }
            maxLength={66}
            value={text}
          ></textarea>
          <br></br>
          <button
            onClick={() =>
              setText("0x" + text.substring(2).repeat(64).substring(0, 64))
            }
          >
            Repeat Sequence
          </button>
          <button
            onClick={() =>
              setText("0x" + text.substring(2).padStart(64, text.charAt(2)))
            }
          >
            Pad Beginning
          </button>
          <button
            onClick={() =>
              setText("0x" + text.substring(2).padEnd(64, text.slice(-1)))
            }
          >
            Pad Ending
          </button>
          <h3>Validation</h3>
          <p style={{ color: validatePkLength(text) ? "green" : "red" }}>
            Length: {text.length} / 66
          </p>
          <p style={{ color: validateHex(text) ? "green" : "red" }}>
            Hex: {validateHex(text).toString()}
          </p>
        </div>

        <h2>Output</h2>
        <div className={styles.code}>
          Ethereum Address:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://etherscan.io/address/" + current_address}
          >
            {current_address}
          </a>
        </div>

        <h2>History</h2>
        <HistoryTable history={history} />

        <hr></hr>

        <p className={styles.desc}>
          An Ethereum private key is a 256-bit number represented in hexadecimal
          format. It serves as a digital identity that enables you to sign
          transactions and securely manage your Ethereum assets. Without this
          key, you cannot access or make transactions within your Ethereum
          wallet. Structure of Ethereum Private Keys In Ethereum, a private key
          is a random string of 32 bytes (64 characters when represented in
          hexadecimal). It is crucial that this number is generated securely and
          remains confidential. Mathematically, an Ethereum private key must be
          greater than zero and smaller than the secp256k1 curve order (n),
          which is approximately 1.158 * 10^77.
        </p>

        <p className={styles.desc}>
          Understanding the structure and constraints of Ethereum private keys
          can provide valuable insights into the Ethereum protocol, enhance
          security measures, and facilitate advanced features such as
          multi-signature wallets and smart contract interactions. Note: Always
          exercise caution and make sure to not expose any private keys that are
          linked to a wallet with funds. This site is an experimental app and
          should be used for educational purposes only. You can learn more <a href="https://ethereum.org/en/developers/docs/accounts.">here</a>.

        </p>

      </main>

      <footer className={styles.footer}>
        <p>
          built with 💪🏻 by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/brianfakhoury"
          >
            @brianfakhoury
          </a>
        </p>
      </footer>
    </div>
  );
}
