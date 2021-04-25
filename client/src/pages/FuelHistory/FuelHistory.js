import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
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
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>

        </TableCell>
        <TableCell component="th" scope="row">
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
  createData('1', 15, "321 Chicken Street, Houston TX 77002", "2/15/2021", 2.98, 44.70),
  createData('2', 12, "321 Donut Street, Houston TX 77001", "2/12/2021", 2.61, 36.7),
  createData('3', 15, "961 Milam Street, Houston TX 77001", "2/13/2021", 2.12, 47.8),
  createData('4', 19, "616 Travis Rd, Houston TX 77001", "2/15/2021", 2.62, 41.8),
  createData('5', 10, "12 Houston Rd, Houston TX 77001", "2/17/2021", 2.29, 41.8),

];

export default function FuelHistory() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Quote ID</TableCell>
            <TableCell align="right">Gallons Requested</TableCell>
            <TableCell align="right">Delivery Address</TableCell>
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