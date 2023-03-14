import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/index.jsx";
import './styles.css';
import api from "../../Service/index.js";

function RendaDespesas(props) {
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [totalExpenditure, setTotalExpenditure] = useState([]);

  useEffect(() => {
    async function getAllAmounts() {
      const { data } = await api.get('/all-amounts');
      const MonthlyAmount = parseFloat(data[0].monthly_amount);
      const ExtraIncome = parseFloat(data[0].extra_income);
      const AmountExpenditure = parseFloat(data[0]['SUM(amount_expenditure)']);
      setTotalRevenue(MonthlyAmount + ExtraIncome);
      setTotalExpenditure(AmountExpenditure);
    }
    getAllAmounts();
  }, [totalRevenue]);

  return (
    <div className="d-flex justify-content-center align-items-center hegth-80vh mobile-renda-despesas">
      <div className="cards-rd">
        <Card amountValue={totalRevenue} title="Renda" />
      </div>
      <div className="cards-rd">
        <Card amountValue={totalExpenditure} title="Despesa" />
      </div>
    </div>
  );
}

export default RendaDespesas;