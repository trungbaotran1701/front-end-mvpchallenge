import React, { useState } from "react";
import elliptic from "elliptic";
const EC = elliptic.ec;
const ec = new EC("p256");

const Login = () => {
  const [fileError, setFileError] = useState("");
  const [privateKeyStatus, setPrivateKeyStatus] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const privateKey = event.target.result.trim();
        if (validatePrivateKey(privateKey)) {
          // Perform login action
          setFileError(""); // Clear any previous error message
          setPrivateKeyStatus(true);
        } else {
          setFileError("Invalid private key!");
          setPrivateKeyStatus(false);
        }
      };
      reader.readAsText(file);
    }
  }

  function validatePrivateKey(privateKey) {
    try {
      const key = ec.keyFromPrivate(privateKey, "hex");
      // Ensure the generated public key is valid
      return !!key.getPublic();
    } catch (err) {
      return false;
    }
  }

  return (
    <div>
      <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
        Login
      </h2>
      <div>
        <input
          type="file"
          accept="text/plain"
          onChange={handleFileChange}
          className="block w-1/2 bg-blue-500 text-white font-bold p-4 rounded-lg"
        />
        {fileError && <p className="text-red-400 mt-2">{fileError}</p>}
        {privateKeyStatus === true && (
          <p className="text-green-400 mt-2">Valid private key!</p>
        )}
      </div>
    </div>
  );
};

export default Login;
