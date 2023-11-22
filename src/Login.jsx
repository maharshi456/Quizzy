import { addDoc, collection } from "@firebase/firestore";
import { LeaderboardRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { now } from "moment";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import { useEffect, useState } from "react";
import { Drawer } from "@mui/joy";

const Categories = ["Bash", "Linux", "Docker", "SQL", "DevOps"];

const Login = ({
  setType,
  db,
  setLoginID,
  playersList,
  setMessage,
  setOpen,
  setCallApi,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState(false);

  const onSubmit = async (event) => {
    if (playersList.filter((i) => i.name === event.name).length > 0) {
      setOpen(true);
      setMessage("Username Already Exist");
    } else {
      setType(event.type);
      try {
        const docRef = await addDoc(collection(db, "Leaderboard"), {
          name: event.name,
          score: 0,
          used_at: now(),
        });
        setLoginID(docRef.id);
        navigate("/main");
      } catch (e) {
        setOpen(true);
        setMessage(e.message);
      }
    }
  };

  useEffect(() => {
    setCallApi((prev) => !prev);
  }, []);

  return (
    <>
      <Box height={"100%"}>
        <Button
          sx={{ m: 1 }}
          variant="contained"
          onClick={() => setAnchor(true)}
          startIcon={<LeaderboardRounded />}
        >
          LeaderBoard
        </Button>
        <Card
          sx={{
            marginTop: "17% !important",
            backgroundColor: "#d7edf5",
            maxInlineSize: "fit-content",
            margin: "auto",
          }}
        >
          <CardContent sx={{ px: 10 }}>
            <Typography variant="h5" py={3} textAlign={"center"}>
              Login ✏️
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <TextField
                id="name"
                name="name"
                label="Username🔤"
                fullWidth
                margin="normal"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Typography color={"red"}>⚠️ Please Enter Username</Typography>
              )}
              <FormControl fullWidth margin="normal">
                <InputLabel>Type</InputLabel>
                <Select
                  id="type"
                  name="type"
                  label="Type"
                  defaultValue={""}
                  {...register("type", { required: true })}
                >
                  {Categories.map((cat, cid) => (
                    <MenuItem value={cat} key={cid}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.type && (
                <Typography color={"red"}>
                  ⚠️ Please Select language For Quiz
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 1.5 }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Drawer
        anchor={"left"}
        open={anchor}
        variant="soft"
        color="primary"
        size="md"
        onClose={() => setAnchor(false)}
      >
        <LeaderBoard playersList={playersList} />
      </Drawer>
    </>
  );
};

Login.propTypes = {
  setType: PropTypes.func,
  db: PropTypes.object,
  setLoginID: PropTypes.func,
  setOpen: PropTypes.func,
  setMessage: PropTypes.func,
  setCallApi: PropTypes.func,
  playersList: PropTypes.array,
};

export default Login;