import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title/index.jsx';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {

  const number = props.totalRevenue;
  const formattedNumber = number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <React.Fragment>
      <Title>Total de Renda</Title>
      {
        isNaN(props.totalRevenue) ? "Você precisa cadastrar a sua renda" :
          <Typography component="p" variant="h4">
        {formattedNumber}
      </Typography>
      }
      
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver Mais
        </Link>
      </div>
    </React.Fragment>
  );
}