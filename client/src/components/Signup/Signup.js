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

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

// import CircularProgress from '@material-ui/core/CircularProgress';

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Signup() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
    setOpen(true);
    axios
      .post(process.env.REACT_APP_SERVER_URL + "signup", signupInfo)
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
            setTimeout(() => {
              history.push("/login");
            }, 2000);
        }
      })
      .catch((err) => console.log(err));
      console.log(signupInfo);
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" className={classes.header}>
          Sign Up
        </Typography>
        <FormControl className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required="true"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <FormHelperText id="my-helper-text">*Required</FormHelperText>
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
          <FormHelperText id="my-helper-text">*Required</FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={signup}
          >
            Sign Up
          </Button>
          <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Account Successfully Created!
            </Alert>
          </Snackbar>
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
        </FormControl>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
