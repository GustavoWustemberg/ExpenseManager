import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title/index.jsx';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Total de Renda</Title>
      <Typography component="p" variant="h4">
        R$1,024.00
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver Mais
        </Link>
      </div>
    </React.Fragment>
  );
}