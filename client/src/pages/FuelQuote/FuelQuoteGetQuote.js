import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#1493ce",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
  dialogBox: {
    width: "30rem",
    height: "30rem",
  },
  buttonGet: {
    background: "#c9c9c9",
    color: "#000000",
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
  buttonSubmit: {
    background: "#c9c9c9",
    color: "#000000",
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
    marginLeft: theme.spacing(3)
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FuelQuoteGetQuote({userId}) {
  const classes = useStyles();

  const usStates = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
    "DC",
    "GU",
    "MP",
    "PR",
    "AS",
    "VI",
    "US",
    "CZ",
  ];

  const [open, setOpen] = React.useState(false);

  let history = useHistory();

  const [quoteForm, setQuoteForm] = useState({
    gallons: "",
    location: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(true);

  const enabled = quoteForm.gallons.length > 0 && quoteForm.location.length > 0;

  const [showCalculation, setShowCalculation] = useState(false);
  // const [suggestedPrice, setSuggestedPrice] = useState(null);
  // const [totalPrice, setTotalPrice] = useState(null);
  // const [userId2, setUserId2] = useState(null);
  const [getQuote, setGetQuote] = useState({
    quote: "",
    total: "",
  }) 


  // useEffect(() => {
  //   setUserId2(userId);
  // }, []);

  const handleChange = (e) => {
    setQuoteForm({
      ...quoteForm,
      [e.target.name]: e.target.value,
    });
  };

  // const handleClickEnableSubmit = () => {
  //   setBtnDisabled(false)
  // }

  //opening the quote form
  const handleClickOpen = () => {
    setOpen(true);
  };

  //closing the quote form
  const handleClose = () => {
    setOpen(false);
  };

  const getQuoteCalculation = (e) => {
    e.preventDefault();
    console.log(quoteForm);
    axios
      .post(process.env.REACT_APP_SERVER_URL + "quote", {
        userid: localStorage.getItem("userid"),
        location: quoteForm.location,
        gallons: quoteForm.gallons
      })
        .then((res) => {
          setShowCalculation(true);
          // setSuggestedPrice(quote);
          // setTotalPrice(total);
          setBtnDisabled(false);
          console.log(res.data)
          setGetQuote({
            quote: res.data.quote,
            total: res.data.total
          });
          // localStorage.setItem("userid", res.data.userid);
        })
  };

  //submitting the quote form
  const submitForm = (e) => {
    e.preventDefault();
    console.log(quoteForm);
    axios
      .post(process.env.REACT_APP_SERVER_URL + "save-quote", {
        userid: localStorage.getItem("userid"),
        location: quoteForm.location,
        gallons: quoteForm.gallons,
        quote: getQuote.quote,
        total: getQuote.total
      })
      .then((res) => {
        console.log(res.data);
        console.log(quoteForm);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setGetQuote({
            quote: res.data.quote,
            total: res.data.total,
          });
          history.push("/fuel-history");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Get Quote
          </Button>
          <Dialog
            keepMounted
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
                  scroll="paper"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Fuel Quote Form
                </Typography>
              </Toolbar>
            </AppBar>
            <DialogContent className={classes.dialogBox}>
              <div>
                <Grid container direction="column" className={classes.grid}>
                  <Grid item xs={6}>
                    <TextField
                      name="gallons"
                      id="outlined-basic"
                      label="# of Gallons *"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      helperText="example) 22.5"
                      onChange={handleChange}
                    ></TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      select
                      required
                      fullWidth
                      name="location"
                      label="State"
                      type="state"
                      id="state"
                      autoComplete="state"
                      margin="dense"
                      onChange={handleChange}
                    >
                      {usStates.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item>
                    <List>
                      <ListItem button>
                        <ListItemText
                          primary="Suggested Price per Gallon"
                          secondary={
                            
                            showCalculation ? `$${getQuote.quote}` : "-"
                          
                          }
                        />
                      </ListItem>
                      <Divider />
                      <ListItem button>
                        <ListItemText
                          primary="Total Amount Due"
                          secondary={showCalculation ? `$${getQuote.total}` : "-"}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled={!enabled}
                      className={classes.buttonGet}
                      onClick={getQuoteCalculation}
                    >
                      Get Quote
                    </Button>
                    <Button
                      disabled={btnDisabled}
                      className={classes.buttonSubmit}
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
}
