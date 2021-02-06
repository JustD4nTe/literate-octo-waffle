import React from "react";
import "../../App.css";
import "../../index.css";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddSpending() {
  const style = makeStyles({})();

  return (
    <div className="widget">
      <h2>Add spending</h2>

      {/* Add spending form*/}
      <div className={style.form}></div>
    </div>
  );
}