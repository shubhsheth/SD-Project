import React from "react";
import Grid from "@material-ui/core/Grid";
import "./Home.css";

import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import HomeBG from "../../assets/homepic.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    background: "transparent",
    color: "transparent",
    boxShadow: "none",
    top: "10px",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Oleo Script",
    textShadow: "10px 10px 10px #000000",
  },
  signUp: {
    flexGrow: 1,
    color: "#FFB800",
    background: "#000000",
    fontFamily: "Oleo Script",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#000000",
      backgroundColor: "#FFB800",
    },
    borderRadius: 10,
    width: 100,
    margin: theme.spacing(1),
  },
  logIn: {
    flexGrow: 1,
    color: "#000000",
    background: "#FFB800",
    fontFamily: "Oleo Script",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#FFB800",
      backgroundColor: "#000000",
    },
    borderRadius: 10,
    width: 100,
    margin: theme.spacing(1),
  },
  intro: {
    fontFamily: "Oleo Script",
    background: "transparent",
    boxShadow: "none",
    flexGrow: 1,
    textShadow: "10px 10px 10px #000000",
    color: "#FA9232",
    display: "flex",
    justifyContent: "flex",
    alignItems: "center",
    margin: theme.spacing(6),
  },
  calc: {
    textAlign: "center",
    marginBottom: theme.spacing(20),
  },
  button: {
    background: "#000000",
    color: "#FFB800",
    width: "20%",
    borderRadius: "10px",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#000000",
      backgroundColor: "#FFB800",
    },
    fontFamily: "Oleo Script",
    fontSize: "18px",
  },
  pic: {
    backgroundRepeat: "no-repeat",
    height: "30vh",
    width: "30vw",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container class="section">
        <AppBar className={classes.navbar} position="absolute">
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              <Link
                href="/"
                style={{ textDecoration: "none", color: "#FA9232" }}
              >
                FuelCalc
              </Link>
            </Typography>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <Button className={classes.signUp}>Signup</Button>
            </Link>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button className={classes.logIn}>Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Grid item className={classes.calc}>
          <Typography className={classes.intro} variant="h2">
            Calculate Fuel Trip Prices Easily!
          </Typography>
          <Button className={classes.button}>
            <Link
                href="/fuel-quote"
                style={{ textDecoration: "none", color: "#FA9232" }}
              >
                Get Started
            </Link>
          </Button>
        </Grid>
        <Grid item>
          <img src={HomeBG} alt="" className={classes.pic}></img>
        </Grid>
      </Grid>
    </div>
  );
}
