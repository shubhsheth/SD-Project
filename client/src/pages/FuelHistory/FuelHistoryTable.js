import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


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


export default function FuelHistory() {
  const classes = useRowStyles();
  const [history, setHistory] = useState([])

  const columns = [
    { label: "Gallons", key: "gallons", align: "right" },
    { label: "State", key: "location", align: "right" },
    { label: "Date & Time", key: "date", align: "right" },
    { label: "Price Per Gallon ($)", key: "quote", align: "right" },
    { label: "Total ($)", key: "total", align: "right" },
  ];

  const getHistory = () => {
    axios
      .post(process.env.REACT_APP_SERVER_URL + "fuel-history", {
        userid: localStorage.getItem("userid"),
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setHistory(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getHistory()
  }, []);

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="right">
                {row.gallons}
              </TableCell>
              <TableCell align="right">
                {row.address}
              </TableCell>
              <TableCell align="right">
                {Date(row.date).toString()}
              </TableCell>
              <TableCell align="right">
                {row.price}
              </TableCell>
              <TableCell align="right">
                {parseFloat(row.total).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}