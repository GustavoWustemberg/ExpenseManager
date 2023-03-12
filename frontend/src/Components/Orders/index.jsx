import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title/index.jsx';

// Generate Order Data
function createData(id, data, nome, valor) {
  return { id, data, nome, valor };
}

const rows = [
  createData(
    0,
    '15 Mar, 2019',
    'Internet',
    '99,90',
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Cartão de crédito',
    '100,00',
  ),
  createData(
    3,
    '16 Mar, 2019',
    'Roletadas',
    '150,00',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
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
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Ver mais
      </Link>
    </React.Fragment>
  );
}