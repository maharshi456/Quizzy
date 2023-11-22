import React from "react";
import PropTypes from "prop-types";
import { Table, Typography } from "@mui/joy";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { EmojiEvents } from "@mui/icons-material";

const LeaderBoard = ({ playersList }) => {
  console.log(playersList);
  return (
    <>
      <Typography level="h3" textAlign={"center"} m={1}>
        LeaderBoard
      </Typography>
      <Table
        borderAxis="x"
        color="warning"
        stickyHeader
        stripe="odd"
        variant="soft"
        sx={{ "& tr > *:not(:first-of-type)": { textAlign: "center" } }}
      >
        <TableHead>
          <TableRow>
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
                <TableRow key={idx}>
                  <TableCell>
                    <Typography level="title-lg">
                      {idx == 0 && (
                        <EmojiEvents color="warning" fontSize="medium" />
                      )}
                      {i.name}
                    </Typography>
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
      </Table>
    </>
  );
};

LeaderBoard.propTypes = {
  playersList: PropTypes.array,
};

export default LeaderBoard;
