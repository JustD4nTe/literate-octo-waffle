import "../App.css";
import { Grid } from "@material-ui/core";

export default function Card() {
  return (
    <Grid container item sm spacing={2}>
      <Grid item xs={12}>
        <h1>Card</h1>
      </Grid>
    </Grid>
  );
}
