import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

function App() {
  const API_KEY = "pjaRLNgjcmRxywT1CPFD4a0Vj2p6kn3nXHLeyKTk";
  const [QuestionBank, setQuestionBank] = useState([]);

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
        <Typography variant="h6">Score : 0</Typography>
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
          <Grid container spacing={2} sx={{ maxWidth: "70%" }}>
            {QuestionBank.length > 0 &&
              QuestionBank.map((i, idx) => (
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
                      {/* <List>
                        <ListItem>
                          <Typography variant="subtitle1">
                            A.{i.answers?.answer_a}
                          </Typography>
                        </ListItem>
                      </List> */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
