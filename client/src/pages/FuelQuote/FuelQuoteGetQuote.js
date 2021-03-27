import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#8614ce",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
    marginTop: "20px",
  },
  grid: {
    marginTop: "20px",
    marginLeft: "10px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FuelQuoteGetQuote() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [quoteForm, setQuoteForm] = useState({
    gallons: "",
    address: "",
  });

  const handleChange = (e) => {
    setQuoteForm({
      ...quoteForm,
      [e.target.name]: e.target.value,
    });
  };

  //opening the quote form
  const handleClickOpen = () => {
    setOpen(true);
  };

  //closing the quote form
  const handleClose = () => {
    setOpen(false);
  };

  //submitting the quote form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post("https://sd-project.herokuapp.com/fuel-quote", quoteForm)
      .then((res) => {
        console.log(quoteForm);
      });
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Get Quote
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Fuel Quote Form
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmitForm}>
              Submit Quote
            </Button>
          </Toolbar>
        </AppBar>

        <div>
          <Grid container direction="column" className={classes.grid}>
            <Grid item xs={2}>
              <TextField
                id="outlined-basic"
                label="# of Gallons"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText="example) 22.5"
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Delivery Address"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText="Street Address, City, State, Zip Code"
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item>
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  label="Select Delivery Date"
                  type="date"
                  defaultValue="2021-02-15"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                />
              </form>
            </Grid>
            <Grid item>
              <List>
                <ListItem button>
                  <ListItemText
                    primary="Suggested Price per Gallon"
                    secondary="$2.98"
                  />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="Total Amount Due" secondary="$44.70" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
