import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Jerel Lopez, Seung Jung, Shubh Sheth
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#D95CB8",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#D95CB8",
    color: "white",
  },
  header: {
    fontFamily: "Oleo Script",
  },
}));

export default function Signup() {
  const classes = useStyles();

  const [signupInfo, setSignupInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  // const [signupError, setSignupError] = useState("");

  let history = useHistory();
  const signup = (e) => {
    axios
      .post("http://localhost:5000/signup", signupInfo)
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          history.push("/login");
        }
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* {signupError ? (
        <Alert variant="filled" severity="error">
          {signupError}
        </Alert>
      ) : null} */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" className={classes.header}>
          Sign Up
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            onChange={handleChange}
          />
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm password"
            label="Confirm Password"
            type="password"
            id="confirm password"
            autoComplete="confirm password"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={signup}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="/login"
                variant="body2"
                style={{ textDecoration: "none", color: "black" }}
              >
                {"Already have an account? LogIn"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
