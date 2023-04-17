import * as React from 'react';
import { useState, useEffect } from 'react';
import api from '../../Service/index.js';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title/index.jsx';
import { formatDate } from '../../Utils/formatDate.js';

export default function Orders() {
  const [expenditure, setExpenditure] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    async function getExpenditure() {
      const { data } = await api.get(`/expenditure/${userId}`);
      setExpenditure(data);
    }
    getExpenditure();
  }, []);

  console.log(expenditure)
  // const data = newData.map(item => createData(item.day, item.amount_expenditure));

  function createData(id, data, nome, valor) {
    return { id, data, nome, valor };
  }

  const rows = expenditure.slice(-3).map(expenditure => createData(
    expenditure.expenditure_id,
    formatDate(expenditure.date_expenditure),
    expenditure.name_expenditure,
    expenditure.amount_expenditure,
  ));

  function preventDefault(event) {
    event.preventDefault();
  }
  return (
    <React.Fragment>
      <Title>Despesas Recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{`R$${row.valor}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link className='MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-1ps4owl-MuiTypography-root-MuiLink-root p-top-10' to="historico-despesas">
        Ver mais
      </Link>
    </React.Fragment>
  );
}