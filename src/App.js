// import { Routes, Route } from "react-router-dom";
// import Form from "./Pages/Form";
// import ResultCommit from "./Pages/ResultCommit";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/">
//         <Route index element={<Form />} />
//         <Route path="user/:userName" element={<ResultCommit />} />
//       </Route>
//     </Routes>
//   );
// };

// export default App;

import { useEffect, useState } from "react";
import "./App.css";

import * as WebSocket from "websocket";

const elliptic = require("elliptic");
const EC = elliptic.ec;
const ec = new EC("p256");

function App() {
  const keyPair = ec.genKeyPair();
  const privateKey = keyPair.getPrivate("hex");
  const publicKey = keyPair.getPublic("hex").substring(2);

  console.log("Private Key:", privateKey);
  console.log("Public Key:", publicKey);

  const data = JSON.stringify({
    C: "Create",
    Data: "eyJJZCI6IjYiLCJFc3RXYWl0RGF5IjoyfQ==",
  });

  const signature = keyPair.sign(data);

  console.log("r", signature.r);
  console.log("s", signature.s);

  const signatureStr =
    signature.s.toString(16).padStart(64, "0") +
    signature.r.toString(16).padStart(64, "0");

  console.log("Signature:", signatureStr);

  const [message, setMessage] = useState("");
  let message2 = JSON.stringify({
    type: "transaction",
    from: "client",
    transactionId: "trungtrung",
    publicKey: publicKey,
    signature: signatureStr,
    data: data,
  });

  useEffect(() => {
    console.log("in it");
    const socket = new WebSocket.w3cwebsocket("ws://localhost:9000/ws");

    socket.onopen = function () {
      socket.send(message2);

      // socket.send("helloheee!");
      socket.onmessage = (msg) => {
        console.log(msg.data);
        console.log("we got msg..");
        if (msg.data.startsWith("Hello client")) {
          setMessage(msg.data); // Update the message state variable
        }
      };
    };
  }, [message2]);

  return <div className="App">{message && <h1>{message}</h1>}</div>;
}

export default App;
