
import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import FuelQuoteList from "./FuelQuoteList";
import FuelQuoteGetQuote from "./FuelQuoteGetQuote";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  section: {
    position: "relative",
    width: "100%",
    height: "100vh",
    background: "linear-gradient(45deg, #1493ce, #ff0057)",
    display: "flex",
    justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  calc: {
    textAlign: "center",
    marginTop: theme.spacing(20),
  },
  button: {
    background: "#000000",
    color: "#FFB800",
    width: "10rem",
    borderRadius: "10px",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#000000",
      backgroundColor: "#FFB800",
    },
    fontFamily: "Oleo Script",
    fontSize: "18px",
    marginTop: theme.spacing(3),
  },
  quoteList: {
    marginTop: theme.spacing(5),
  },
}));

export default function FuelQuote({userId}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.section}>
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
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button className={classes.logIn}>Logout</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Grid item xs={12} sm={6} className={classes.calc}>
          <Typography className={classes.intro} variant="h2">
            Get your Fuel Quote Now!
          </Typography>
        </Grid>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <Grid item >
            <FuelQuoteGetQuote userId={userId} />
          </Grid>
          <Grid item >
            <Link href="fuel-history" style={{ textDecoration: "none" }}>
              <Button className={classes.button}>View History</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.quoteList}>
          <FuelQuoteList />
        </Grid>
      </Grid>
    </div>
  );
}
