import * as React from 'react';
import { useState, useEffect } from 'react';
import api from '../../Service/index.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { formatDate } from '../../Utils/formatDate.js';
import { Typography } from '@mui/material';
import './styles.css';

export default function HistoricoDespesas() {
    const [expenditure, setExpenditure] = useState([]);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        async function getExpenditure() {
            const { data } = await api.get(`/expenditure/${userId}`);
            setExpenditure(data);
        }
        getExpenditure();
    }, []);

    console.log(expenditure.length)

    function createData(id, data, nome, valor) {
        return { id, data, nome, valor };
    }
    
    const rows = expenditure.length < 1 ? 0 : 
    expenditure.map(expenditure => createData(
        expenditure.expenditure_id,
        formatDate(expenditure.date_expenditure),
        expenditure.name_expenditure,
        expenditure.amount_expenditure,
    ));
    function preventDefault(event) {
        event.preventDefault();
    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <section className="historico-despesas-container">
                <React.Fragment>
                    <Typography className='p-10' component="h2" variant="h6" color="primary" gutterBottom>
                        Histórico de despesas
                    </Typography>
                    {expenditure.length == 0 ? "Você precisa cadastrar uma despesa" :
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
                    </Table>}
                </React.Fragment>
            </section>
        </div>
    );
}