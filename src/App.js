import { useQuery, gql } from "@apollo/client";
import TopThreeDrivers from "./components/TopThreeDrivers";
import Confetti from "react-confetti";
import "./App.css";
import { Box, Container, Grid } from "@mui/material";
import Alert from "@mui/material/Alert";

const F1MV_QUERY = gql`
  {
    liveTimingState {
      TopThree
      SessionStatus
      SessionInfo
      TrackStatus
      LapCount
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(F1MV_QUERY, {
    pollInterval: 500,
  });
  if (loading) return "loading..";
  if (error) {
    console.log(error.message);
    return (
      <>
        <div className="App">
          <header className="App-header">
            <Alert severity="error">{error.message}</Alert>
            <pre>Make sure you have a F1 session playing on F1MV</pre>
          </header>
        </div>
      </>
    );
  }

  const Session = () => {
    if (data.liveTimingState.SessionInfo.Type !== "Race") {
      return <>{data.liveTimingState.SessionInfo.Name}</>;
    } else {
      return (
        <>
          Lap {data.liveTimingState.LapCount.CurrentLap}/
          {data.liveTimingState.LapCount.TotalLaps}
        </>
      );
    }
  };

  const RaceInactive = () => {
    const status = data.liveTimingState.SessionStatus.Status;
    if (status === "Inactive") {
      return true;
    } else {
      return false;
    }
  };

  const RaceEnded = () => {
    const status = data.liveTimingState.SessionStatus.Status;
    if (status === "Finished" || status === "Ends") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <div className="App">
        <header className="App-header">
          {data.liveTimingState === null ? (
            <> F1MV Sessions is not active</>
          ) : (
            <>
              <h1>{data.liveTimingState.SessionInfo.Meeting.Name}</h1>
              {RaceEnded() ? (
                <>
                  <Confetti />
                  Chequered flag
                </>
              ) : (
                <Session />
              )}

              <Container>
                {RaceInactive() ? (
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid item>
                      <p>Session not started yet</p>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    <TopThreeDrivers
                      lines={data.liveTimingState.TopThree.Lines}
                      ended={RaceEnded()}
                    />
                  </Grid>
                )}
              </Container>
            </>
          )}
        </header>
      </div>
    </>
  );
}
