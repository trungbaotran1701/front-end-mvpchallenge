import React, { useState } from "react";
import elliptic from "elliptic";
const EC = elliptic.ec;
const ec = new EC("p256");

const Login = () => {
  const [fileError, setFileError] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const privateKey = event.target.result.trim();
      if (validatePrivateKey(privateKey)) {
        // Perform login action
        setPrivateKey(privateKey);
      } else {
        setFileError("Invalid private key!");
      }
    };
    reader.readAsText(file);
  }

  function validatePrivateKey(privateKey) {
    if (typeof privateKey !== "string" || privateKey.length !== 64) {
      return false;
    }
    const hexRegex = /^[0-9a-fA-F]+$/;
    if (!hexRegex.test(privateKey)) {
      return false;
    }
    try {
      ec.keyFromPrivate(privateKey, "hex");
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {privateKey && <p>Login successful! {privateKey}</p>}
      <div>
        <input type="file" accept="text/plain" onChange={handleFileChange} />
        {fileError && <p>{fileError}</p>}
      </div>
    </div>
  );
};

export default Login;
