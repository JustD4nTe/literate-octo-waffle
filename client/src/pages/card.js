import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";

export default function Card() {
  const style = makeStyles({})();

  return (
    <div className={style.main}>
      <h1>Card</h1>
    </div>
  );
}