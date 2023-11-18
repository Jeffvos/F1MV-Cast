import React from "react";
import Button from "@mui/material/Button";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const TopThreeDriverCard = ({ line, ended }) => {
  const teamColour = "#" + line.TeamColour;
  const driverPhoto = "/assets/drivers/" + line.RacingNumber + ".png";
  const GapTime = () => {
    if (line.Position === "1") {
      return line.LapTime;
    } else {
      return line.DiffToAhead;
    }
  };
  return (
    <Grid item>
      <Card
        variant="outlined"
        sx={{ maxWidth: 280, margin: 5, minWidth: 280, maxHeight: 560 }}
        style={{ backgroundColor: "darkgray", textAlign: "center" }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: teamColour }} aria-aria-label="driver">
              {line.Position}
            </Avatar>
          }
          titleTypographyProps={{ variant: "h3" }}
          title={ended ? "" : <GapTime />}
        />
        <CardMedia
          sx={{ height: 340 }}
          image={driverPhoto}
          title={line.FullName}
        />
        <CardContent style={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            <Button sx={{ bgcolor: teamColour }} variant="contained">
              {line.RacingNumber} {line.FullName}
            </Button>
            <p>
              <Button sx={{ bgcolor: teamColour }} variant="contained">
                {line.Team}
              </Button>
            </p>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TopThreeDriverCard;
