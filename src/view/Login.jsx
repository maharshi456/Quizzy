import { addDoc, collection } from "@firebase/firestore";
import {
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import { now } from "moment";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginBG from "../images/LoginBg.jpg";
import { alpha } from "@mui/material/styles";
import "./bounce.css";

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
  const [isBouncing, setIsBouncing] = useState(false);
  const theme = createTheme();

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
        localStorage.setItem("user", JSON.stringify(event.name));
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

  const SubmitUp = () => {
    setIsBouncing(true);

    // Reset the state after the animation duration
    setTimeout(() => {
      setIsBouncing(false);
    }, 750);
  };

  const isMd5 = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Container>
      <Box boxShadow={10} sx={{ borderRadius: "1.5%" }}>
        <Grid container>
          {isMd5 && (
            <Grid item sm={8}>
              <Box
                component="img"
                alt="Welcome To Quizzy"
                src={LoginBG}
                sx={{
                  borderBottomLeftRadius: "1.5%",
                }}
                height={"100%"}
                width={"100%"}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#ffcb88",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: "1.5%",
                borderBottomRightRadius: "1.5%",
              }}
            >
              <CardContent
                sx={{
                  paddingTop: "20%",
                }}
              >
                <Typography
                  variant="h4"
                  py={3}
                  textAlign={"center"}
                  sx={{ fontFamily: "Georgia" }}
                >
                  Register
                </Typography>
                <Typography
                  variant="h6"
                  pt={8}
                  pb={2}
                  textAlign={"center"}
                  sx={{ fontFamily: "URW Chancery L" }}
                >
                  Welcome to Quizzy
                </Typography>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  method="POST"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <TextField
                    id="name"
                    name="name"
                    label="Username"
                    fullWidth
                    margin="normal"
                    variant="standard"
                    sx={{
                      "& .MuiInputBase-input": {
                        "&:focus": {
                          boxShadow: `${alpha("#1976d2", 0.23)} 0 0.3rem`,
                        },
                      },
                    }}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <Typography color={"red"} variant="caption">
                      Please Enter Username
                    </Typography>
                  )}
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Type</InputLabel>
                    <Select
                      id="type"
                      name="type"
                      label="Type"
                      defaultValue={""}
                      variant="standard"
                      sx={{
                        "& .MuiInputBase-input": {
                          "&:focus": {
                            boxShadow: `${alpha("##1976d2", 0.23)} 0 0.3rem`,
                          },
                        },
                      }}
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
                    <Typography color={"red"} variant="caption">
                      Select Programming language For Quiz
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      p: 2.2,
                      mt: 5,
                      borderRadius: "10px",
                      backgroundColor: "#87ADDE",
                      px: 5,
                    }}
                    className={`bounce ${isBouncing ? "animate-bounce" : ""}`}
                    onClick={SubmitUp}
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
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
