import { Routes, Route } from "react-router-dom";
import Form from "./Pages/Form";
import ResultCommit from "./Pages/ResultCommit";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Form />} />
        <Route
          path="user/:userName"
          element={<ResultCommit />}
        />
      </Route>
    </Routes>
  );
};

export default App;
