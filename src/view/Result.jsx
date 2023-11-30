import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <Card sx={{ m: 10, backgroundColor: "#d7edf5" }}>
      <CardContent>
        <Typography variant="h3" textAlign="center">
          Score : {state.length}
        </Typography>
        <Typography variant="h4" textAlign="center">
          🎉 Whoooo! 🥳🎉
        </Typography>
      </CardContent>
      <CardActions sx={{ placeContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Back To Home
        </Button>
      </CardActions>
    </Card>
  );
};

export default Result;
