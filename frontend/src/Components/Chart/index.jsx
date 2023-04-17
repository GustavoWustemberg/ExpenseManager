import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title/index.jsx';
import api from '../../Service/index.js';

// Generate Sales Data


export default function Chart() {
  const [expenditure, setExpenditure] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    async function getExpenditure() {
      const { data } = await api.get(`/expenditure/${userId}`);
      setExpenditure(data);
    }
    getExpenditure();
  }, []);

  const currentMonth = new Date().getMonth() + 1;
  const monthToFilter = currentMonth;

  // Filtra as despesas pelo mês
  const filteredData = expenditure.filter(expenditure => {
    const month = new Date(expenditure.date_expenditure).getMonth() + 1;
    return month === monthToFilter;
  });

  // Agrupa as despesas por dia
  const newData = filteredData.reduce((acc, expenditure) => {
    const day = new Date(expenditure.date_expenditure).getDate();
    if (typeof acc[day] === 'undefined') {
      acc[day] = {
        day: day,
        amount_expenditure: 0
      };
    }
    acc[day].amount_expenditure += parseFloat(expenditure.amount_expenditure);
    return acc;
  }, []).filter(Boolean);

  const theme = useTheme();

  function createData(time, amount) {
    return { time, amount };
  }

  const data = newData.map(item => createData(item.day, item.amount_expenditure));


  return (
    <React.Fragment>
      <Title>Resumo do mês</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Valores (R$)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}