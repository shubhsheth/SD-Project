import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

export default function ProfileManagement() {
	const classes = useStyles();
	const usStates = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC", "GU", "MP", "PR", "AS", "VI", "US", "CZ"]

  let history = useHistory();

  const [profileCred, setProfileCred] = useState({
    fullname: "",
    address1: "",
	  address2: "",
	  city: "",
	  state: "",
	  zip: "",
    });

    const handleChange = (e) => {
      setProfileCred({
        ...profileCred,
        [e.target.name]: e.target.value,
      });
    };

	  const save = (e) => {
      axios
        .post(process.env.REACT_APP_SERVER_URL + "profile-management", profileCred)
        .then((res) => {
          console.log(res.data);
          if (res.data.error) {
            console.log(res.data.error);
          } else {
            console.log(res.data.credentials);
            if (res.data.credentials) {
              history.push("/fuel-quote");
            } else if (!res.data.credentials) {
              console.log(res.data);
              history.push("/profile-management");
            }
          }
        })
        .catch((err) => console.log(err));
      e.preventDefault();
    };

	return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" className={classes.header}>
          Profile
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullname"
            autoComplete="fullname"
            autoFocus
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 50);
            }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address1"
            label="Address 1"
            type="address1"
            id="address1"
            autoComplete="address1"
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 100);
            }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="address2"
            label="Address 2"
            type="address2"
            id="address2"
            autoComplete="address2"
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 100);
            }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="city"
            label="City"
            type="city"
            id="city"
            autoComplete="city"
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 100);
            }}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            select
            required
            fullWidth
            name="state"
            label="State"
            type="state"
            id="state"
            autoComplete="state"
            onChange={handleChange}
          >
            {usStates.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="zip"
            label="Zip Code"
            type="zipcode"
            id="zipcode"
            autoComplete="zipcode"
            onInput={(e) => {
              e.target.value = e.target.value.slice(0, 5);
            }}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
			onClick={save}
          >
            Save
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
