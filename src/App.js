import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./Main";
import Result from "./Result";
import { db } from "./Firestore";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { now } from "moment";
import Login from "./Login";
import ErrorSnackBar from "./ErrorSnackBar";

function App() {
  const [type, setType] = useState("sql");
  const [loginID, setLoginID] = useState("");
  const [playersList, setPlayersList] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getDocs(collection(db, "Leaderboard")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setPlayersList(newData);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Login
                setType={setType}
                db={db}
                setLoginID={setLoginID}
                playersList={playersList}
                setOpen={setOpen}
                setMessage={setMessage}
              />
            }
            path="/"
          />
          <Route
            element={
              <Main
                type={type}
                loginID={loginID}
                setOpen={setOpen}
                setMessage={setMessage}
              />
            }
            path="/main"
          />
          <Route element={<Result />} path="/result" />
        </Routes>
      </BrowserRouter>
      <ErrorSnackBar setOpen={setOpen} open={open} Message={message} />
    </>
  );
}

export default App;
