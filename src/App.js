import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { db } from "./Firestore";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import ErrorSnackBar from "./utils/ErrorSnackBar";
import Login from "./view/Login";
import Main from "./view/Main";
import Result from "./view/Result";
import { Drawer } from "@mui/joy";
import { Box, IconButton } from "@mui/material";
import LeaderBoard from "./view/LeaderBoard";
import { EmojiEventsRounded } from "@mui/icons-material";
import DrawerBG from "./images/fight.jpg";

function App() {
  const [type, setType] = useState("sql");
  const [loginID, setLoginID] = useState("");
  const [playersList, setPlayersList] = useState([]);
  const [open, setOpen] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [anchor, setAnchor] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getDocs(
      query(collection(db, "Leaderboard"), orderBy("score", "desc"))
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setPlayersList(newData);
    });
  }, [callApi]);

  return (
    <>
      <IconButton
        size="large"
        sx={{
          mt: 5,
          backgroundColor: "#ffcb88",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          color: "black",
          "&:hover": {
            backgroundColor: "#ffcb88", // Set the same color to prevent it from changing on hover
          },
        }}
        onClick={() => setAnchor(true)}
      >
        <EmojiEventsRounded fontSize="medium" />
      </IconButton>
      <div className="main">
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
                  setCallApi={setCallApi}
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
      </div>
      <Drawer
        anchor={"left"}
        open={anchor}
        variant="soft"
        size="lg"
        onClose={() => setAnchor(false)}
      >
        <Box
          sx={{
            background: `url(${DrawerBG})`,
            height: "100%",
            display: "grid",
            backgroundSize: "contain",
          }}
        >
          <LeaderBoard playersList={playersList} />
        </Box>
      </Drawer>
      <ErrorSnackBar setOpen={setOpen} open={open} Message={message} />
    </>
  );
}

export default App;
