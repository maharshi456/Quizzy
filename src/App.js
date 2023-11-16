import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import Result from "./Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<Result />} path="/result" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
