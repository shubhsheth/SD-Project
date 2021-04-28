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

  const myList = [
    { location: "TX", gallons: "2", date: "2-2-2021", quote: "a", total: "50" },
    { location: "TX", gallons: "2", date: "2-2-2021", quote: "a", total: "50" },
  ]

  const columns = [
    { label: "Location", key: "location", align: "center" },
    { label: "Gallons", key: "gallons", align: "center" },
    { label: "Date", key: "date", align: "center" },
    { label: "Quote", key: "quote", align: "center" },
    { label: "Total", key: "total", align: "center" },
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
          {myList.map((row, index) => (
            <TableRow key={index} >
              {columns.map((column) => {
                  return (
                    <TableCell key={column.key} align={column.align}>
                    {row[column.key]}
                    </TableCell>);
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}