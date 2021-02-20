import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
						onInput = {(e) =>{
							e.target.value = e.target.value.slice(0,50)
						}}
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
						onInput = {(e) =>{
							e.target.value = e.target.value.slice(0,100)
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="address2"
						label="Address 2"
						type="address2"
						id="address2"
						autoComplete="address2"
						onInput = {(e) =>{
							e.target.value = e.target.value.slice(0,100)
						}}
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
						onInput = {(e) =>{
							e.target.value = e.target.value.slice(0,100)
						}}
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
						name="zipcode"
						label="Zip Code"
						type="zipcode"
						id="zipcode"
						autoComplete="zipcode"
						onInput = {(e) =>{
							e.target.value = e.target.value.slice(0,5)
						}}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						className={classes.submit}
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
