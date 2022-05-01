import Head from "next/head";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";

const abbreviateAddress = (address) =>
  `${address.substring(0, 6)}...${address.substring(38)}`;

const validateHex = (address) =>
  new RegExp(/^(0x|0X)?[a-fA-F0-9]+$/g).test(address);

const validatePkLength = (address) => address.length === 34;

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

export default function Home() {
  const [text, setText] = useState("0x00000000000000000000000000000001");

  const [history, setHistory] = useState([
    [
      "0x00000000000000000000000000000001",
      "0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf",
    ],
  ]);

  const [validation, setValidation] = useState({
    status: false,
    reason: "n/a",
  });

  const pushToHistory = (pk, address) =>
    !history.reduce(
      (prev, curr) => curr[0] === pk || prev,
      history[0] === pk
    ) && setHistory([[pk, address], ...history]);

  const pk2wallet = (pk) => {
    try {
      if (pk.length < 34) {
        throw new Error("too short");
      }
      const w = new ethers.Wallet(pk);
      pushToHistory(pk, w.address);
      return w.address;
    } catch (e) {
      console.log(e);
    }
  };

  const current_address = pk2wallet(text);

  return (
    <div className={styles.container}>
      <Head>
        <title>Private Key Explorer</title>
        <meta
          name="description"
          content="Tool for browsing private key mappings."
        />
        <link rel="icon" href="/favicon.ico" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="brianfakhoury" key="twhandle" />

        {/* Open Graph */}
        <meta
          property="og:image"
          content="https://og-image.vercel.app/Private%20Key%20Explorer.png"
          key="ogimage"
        />
        <meta
          property="og:title"
          content="Private Key Explorer"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Fun & simple tool for browsing private key to public ethereum address mappings."
          key="ogdesc"
        />
        <meta name="viewport" content= "width=device-width, user-scalable=no">

      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Explore Private Keys 👨🏽‍💻🔎</h1>
        </header>

        <div className={styles.input}>
          <h3>Enter Private Key String</h3>
          <input
            type="text"
            onChange={(e) =>
              e.target.value.startsWith("0x")
                ? setText(e.target.value)
                : setText("0x" + e.target.value)
            }
            maxLength="34"
            value={text}
          ></input>
          <br></br>
          <button
            onClick={() =>
              setText("0x" + text.substring(2).repeat(32).substring(0, 32))
            }
          >
            Repeat Sequence
          </button>
          <button
            onClick={() =>
              setText("0x" + text.substring(2).padStart(32, text.charAt(2)))
            }
          >
            Pad Beginning
          </button>
          <button
            onClick={() =>
              setText("0x" + text.substring(2).padEnd(32, text.slice(-1)))
            }
          >
            Pad Ending
          </button>
          <h3>Validation</h3>
          <p style={{ color: validatePkLength(text) ? "green" : "red" }}>
            Length: {text.length} / 34
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
