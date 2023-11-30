import PropTypes from "prop-types";
import { Table, Typography } from "@mui/joy";
import {
  Box,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { MilitaryTech, MilitaryTechOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";

const LeaderBoard = ({ playersList }) => {
  const [CurrentUserData, setCurrentUserData] = useState({});
  const CurrentName = localStorage.getItem("user");

  useEffect(() => {
    const No = playersList.findIndex((i) => i.name == CurrentName);
    No > -1 && setCurrentUserData({ no: No + 1, data: playersList[No] });
  }, [playersList]);

  return (
    <Box
      my={5}
      mx={10}
      borderRadius={3}
      sx={{
        border: "0.5px solid #ffffff3b",
        position: "relative",
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Typography level="h3" textAlign={"center"} m={2}>
        LeaderBoard
      </Typography>
      <Table
        borderAxis="x"
        stickyHeader
        stickyFooter
        variant="soft"
        size="lg"
        sx={{ background: "rgba(255, 255, 255, 0.3)" }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography level="title-lg">No.</Typography>
            </TableCell>
            <TableCell>
              <Typography level="title-lg">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography level="title-lg">Score</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playersList.length > 0 ? (
            playersList.map((i, idx) => {
              const SpendTime =
                moment().diff(i.used_at, "months") == 0
                  ? moment().diff(i.used_at, "days") == 0
                    ? moment().diff(i.used_at, "hours") + " hour"
                      ? moment().diff(i.used_at, "minutes") + " min"
                      : moment().diff(i.used_at, "hours") == 0
                    : moment().diff(i.used_at, "days") + " day"
                  : moment().diff(i.used_at, "months") + " Month";
              return (
                <TableRow
                  key={idx}
                  sx={{ background: i.name == CurrentName && "lightyellow" }}
                >
                  <TableCell>
                    <Typography level="title-lg">{idx + 1}</Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {idx == 0 ? (
                      <MilitaryTech color="warning" fontSize="medium" />
                    ) : (
                      idx == 1 && (
                        <MilitaryTechOutlined
                          color="warning"
                          fontSize="medium"
                        />
                      )
                    )}
                    <Typography level="title-lg">{i.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography level="title-lg">
                      {i.score}
                      <Typography level="body-sm" ml={2}>
                        ~{SpendTime} ago
                      </Typography>
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>
                <Typography>No Records Found</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {Object.keys(CurrentUserData).length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell>
                <Typography level="title-lg">{CurrentUserData?.no}</Typography>
              </TableCell>
              <TableCell>
                <Typography level="title-lg">
                  {CurrentUserData?.data.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography level="title-lg">
                  {CurrentUserData?.data.score}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </Box>
  );
};

LeaderBoard.propTypes = {
  playersList: PropTypes.array,
};

export default LeaderBoard;
