import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { db } from "../Firestore";
import moment, { now } from "moment";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "@firebase/firestore";

const Main = ({ type, loginID, setOpen, setMessage }) => {
  const API_KEY = "OeKeq8NBKtYrxmAVbqUUq37sJVI3mZAoKlMcjU4Z";
  const Ref = useRef("10:00");
  const navigate = useNavigate();
  const [QuestionBank, setQuestionBank] = useState([]);
  const [AnswerId, setAnswerId] = useState([]);
  const [rend, setRend] = useState(false);

  useEffect(() => {
    if (Ref.current <= "00:00") {
      navigate("/result", { state: AnswerId });
    } else {
      const intervalId = setInterval(() => {
        Ref.current = moment(Ref.current, "mm:ss")
          .subtract(1, "seconds")
          .format("mm:ss");
        setRend((prev) => !prev);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [rend]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginID) {
      try {
        await updateDoc(doc(db, "Leaderboard", loginID), {
          score: AnswerId.length,
          used_at: now(),
        });
        navigate("/result", { state: AnswerId });
      } catch (e) {
        setOpen(true);
        setMessage(e.message);
      }
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=${type}&difficulty=Easy&limit=10`
      )
      .then((res) => setQuestionBank(res.data))
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <Grid container sx={{ backgroundColor: "#d7edf5" }} spacing={8} p={2}>
      <Grid item xs={4}>
        <Typography variant="h5">{QuestionBank[0]?.category}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h3" textAlign={"center"}>
          {Ref.current}
        </Typography>
      </Grid>
      <Grid item xs={4} textAlign={"right"}>
        <Typography variant="h6">Total: {QuestionBank?.length}</Typography>
        <Typography variant="body1">
          Difficulty: {QuestionBank[0]?.difficulty}
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign={"-webkit-center"}>
        <Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ maxWidth: "70%" }}>
              {QuestionBank.length > 0 &&
                QuestionBank.map((i, idx) => {
                  return (
                    <Grid item xs={12} key={idx}>
                      <Card sx={{ boxShadow: 3, textAlign: "left" }}>
                        <CardContent>
                          <Typography variant="body1" fontWeight={600}>
                            Q.{idx + 1}) {i.question}
                          </Typography>
                          <FormControl sx={{ ml: 1 }}>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                              onChange={(e) => {
                                const Answer = Object.keys(i?.correct_answers)
                                  .filter(
                                    (key) => i.correct_answers[key] == "true"
                                  )[0]
                                  .slice(0, -8);
                                if (e.target.value == Answer) {
                                  AnswerId.includes(idx) == false &&
                                    setAnswerId([...AnswerId, idx]);
                                } else {
                                  if (AnswerId.includes(idx)) {
                                    let RemoveIndex = AnswerId.indexOf(idx);
                                    const Arr = AnswerId;
                                    Arr.splice(RemoveIndex, 1);
                                    setAnswerId(Arr);
                                  }
                                }
                              }}
                            >
                              {i.answers?.answer_a && (
                                <FormControlLabel
                                  value="answer_a"
                                  control={<Radio size="small" />}
                                  label={i.answers?.answer_a}
                                />
                              )}
                              {i.answers?.answer_b && (
                                <FormControlLabel
                                  value="answer_b"
                                  control={<Radio size="small" />}
                                  label={i.answers?.answer_b}
                                />
                              )}
                              {i.answers?.answer_c && (
                                <FormControlLabel
                                  value="answer_c"
                                  control={<Radio size="small" />}
                                  label={i.answers?.answer_c}
                                />
                              )}
                              {i.answers?.answer_d && (
                                <FormControlLabel
                                  value="answer_d"
                                  control={<Radio size="small" />}
                                  label={i.answers?.answer_d}
                                />
                              )}
                              {i.answers?.answer_e && (
                                <FormControlLabel
                                  value="answer_e"
                                  control={<Radio size="small" />}
                                  label={i.answers?.answer_e}
                                />
                              )}
                            </RadioGroup>
                          </FormControl>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              {AnswerId.length > 0 && (
                <Grid item>
                  <Button color="success" variant="contained" type="submit">
                    Submit
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

Main.propTypes = {
  type: PropTypes.string,
  setOpen: PropTypes.func,
  setMessage: PropTypes.func,
};

export default Main;
