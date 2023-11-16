import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Slide,
  Typography,
} from "@mui/material";

function App() {
  const API_KEY = "pjaRLNgjcmRxywT1CPFD4a0Vj2p6kn3nXHLeyKTk";
  const [QuestionBank, setQuestionBank] = useState([]);
  const [AnswerId, setAnswerId] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(
        `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=sql&difficulty=Easy&limit=10`
      )
      .then((res) => setQuestionBank(res.data))
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <Grid container sx={{ backgroundColor: "#d7edf5" }} spacing={8} p={2}>
      <Grid item xs={4}>
        <Typography variant="h5">{QuestionBank[0]?.category}</Typography>
      </Grid>
      <Grid item xs={4} />
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
                                console.log("OLD Arr", AnswerId);
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
          <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              <Typography variant="h5">Score : {AnswerId.length}</Typography>
            </DialogTitle>
            <DialogContent>🎉 Whoooo! 🥳🎉</DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Got it</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
