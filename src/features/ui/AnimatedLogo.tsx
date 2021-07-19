import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import blue from "@material-ui/core/colors/blue";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: "inline-flex",
      alignItems: "flex-end",
      height: "35rem",
      width: "35rem",
      transform: "rotateX(45deg) rotateZ(15deg)",
      transformStyle: "preserve-3d",
      [theme.breakpoints.down("md")]: {
        marginLeft: "4rem",
      },
    },
    shape: {
      position: "relative",
      width: "6.8rem",
      height: "20rem",
      transition: ".5s",
      zIndex: 500,
      boxShadow:
        "2px 2px 12px rgba(155, 155, 155, 0.9), 23rem 22rem 2rem rgba(190, 190, 190, 0.9)",
      [theme.breakpoints.down("md")]: {
        boxShadow: "2px 2px 12px rgba(155, 155, 155, 0.9)",
      },
      animation: "$bump 1.5s ease-in-out infinite",
      border: "1px solid grey",
      borderRadius: "1.2rem",
      marginLeft: "1rem",

      "&:nth-of-type(1)": {
        height: "40%",
        backgroundColor: blue["300"],
        animationDelay: "0.05s",
      },
      "&:nth-of-type(2)": {
        height: "80%",
        backgroundColor: blue["500"],
        animationDelay: "0.10s",
      },
      "&:nth-of-type(3)": {
        height: "100%",
        backgroundColor: blue["600"],
        animationDelay: "0.15s",
      },
      "&:nth-of-type(4)": {
        height: "60%",
        backgroundColor: blue["400"],
        animationDelay: "0.20s",
      },
    },
    "@keyframes bump": {
      "50%": { transform: "translateZ(3.2rem)" },
    },
  })
);

const AnimatedLogo = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.shape}></div>
      <div className={classes.shape}></div>
      <div className={classes.shape}></div>
      <div className={classes.shape}></div>
    </div>
  );
};

export default AnimatedLogo;
