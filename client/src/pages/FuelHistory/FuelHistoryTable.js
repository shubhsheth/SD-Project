import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  table: {
    width: "100%",
  },
});

function createData( quoteID, gallons, address, date, price, total ) {
  return {
    quoteID,
    gallons,
    address,
    date,
    price,
    total,
  };
}



function Row(props) {
  const { row } = props;
  const classes = useRowStyles();

  // const [quoteHistory, setQuoteHistory] = useState({
  //   location: "",
  //   gallons: "",
  //   date: "",
  //   quote: "",
  //   total: "",
  // })

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="right" component="th" scope="row">
          {row.quoteID}
        </TableCell>
        <TableCell align="right">{row.gallons}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const rows = [
  createData("1", 15, "TX", "2/15/2021", 2.98, 44.7),
  createData("2", 12, "CA", "2/12/2021", 2.61, 36.7),
  createData("3", 15, "VA", "2/13/2021", 2.12, 47.8),
  createData("4", 19, "MS", "2/15/2021", 2.62, 41.8),
  createData("5", 10, "LA", "2/17/2021", 2.29, 41.8),
];

export default function FuelHistory() {
  const classes = useRowStyles();
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Quote ID</TableCell>
            <TableCell align="right">Gallons Requested</TableCell>
            <TableCell align="right">Delivery State</TableCell>
            <TableCell align="right">Delivery Date</TableCell>
            <TableCell align="right">Suggested Price/gallon</TableCell>
            <TableCell align="right">Total Amount Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}