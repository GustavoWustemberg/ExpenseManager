import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/index.jsx";
import './styles.css';
import api from "../../Service/index.js";

function RendaDespesas(props) {
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [MonthlyAmount, setMonthlyAmount] = useState([]);
  const [ExtraIncome, setExtraIncome] = useState([]);
  const [idRevenue, setIdRevenue] = useState([]);
  const [dateRevenue, setDateRevenue] = useState([]);
  const [totalExpenditure, setTotalExpenditure] = useState([]);
  const userId = sessionStorage.getItem('userId');
  
  useEffect(() => {
    async function getAllAmounts() {
      const { data } = await api.get(`/all-amounts/${userId}`);
      const MonthlyAmount = parseFloat(data[0].monthly_amount);
      const ExtraIncome = parseFloat(data[0].extra_income);
      const AmountExpenditure = parseFloat(data[0]['SUM(amount_expenditure)']);
      setMonthlyAmount(MonthlyAmount);
      setExtraIncome(ExtraIncome);
      setTotalRevenue(MonthlyAmount + ExtraIncome);
      setTotalExpenditure(AmountExpenditure);
      setIdRevenue(data[0].revenue_id);
      setDateRevenue(data[0].date_revenue);
    }
    getAllAmounts();
  }, [totalRevenue]);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column hegth-80vh mobile-renda-despesas">
      <p className="m-5 text-center"><b>Aqui você poderá adionar ou editar a sua renda <br/> e adicionar suas despesas</b></p>
      <section className="d-flex justify-content-center align-items-center">
        <div className="cards-rd">
          <Card amountValue={totalRevenue} revenueId={idRevenue} monthlyAmount={MonthlyAmount} extraIncome={ExtraIncome} dateRevenue={dateRevenue} title="Renda" />
        </div>
        <div className="cards-rd">
          <Card amountValue={totalExpenditure} title="Despesa" />
        </div>
      </section>
    </div>
  );
}

export default RendaDespesas;