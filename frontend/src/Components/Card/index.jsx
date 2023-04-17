import Card from 'react-bootstrap/Card';
import { FaRegEdit } from 'react-icons/fa';
import ModalRevenueUpdate from '../Modal/Revenue/update.jsx';
import ModalRevenue from '../Modal/Revenue/create.jsx';
import { useEffect, useState } from 'react';

function TextExample(props) {
  const [loadModalRevenueUpdate, setLoadModalRevenueUpdate] = useState(false);
  const [loadModalRevenue, setLoadModalRevenue] = useState(false);
  const [revenueItem, setRevenueItem] = useState([]);
  // const [revenueData, setRevenueData] = useState([]);

  const data = {
    "monthlyAmount": props.monthlyAmount,
    "extraIncome": props.extraIncome,
    "revenueId": props.revenueId,
  }

  function showRevenueModal() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    const dateRevenue = new Date(props.dateRevenue);
    const revenueMonth = dateRevenue.getMonth() + 1;
    const revenueYear = dateRevenue.getFullYear();
  
    if(props.amountValue > 1 && revenueMonth === currentMonth && revenueYear === currentYear) {
      setLoadModalRevenueUpdate(true);
    } else {
      setLoadModalRevenue(true);
    }
    
    setRevenueItem(data);
  }
  
  

  function showExpenditureModal() {
    alert('Ta aqui')
  }

  return (
    <Card style={{ width: '18rem' }}>
      {loadModalRevenueUpdate && <ModalRevenueUpdate isOpen={loadModalRevenueUpdate} dataRevenue={revenueItem} />}
      {loadModalRevenue && <ModalRevenue isOpen={loadModalRevenue} dataRevenue={revenueItem} />}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {isNaN(props.amountValue) || props.amountValue == 0 ? "Você precisa cadastrar uma renda e uma despesa" : props.amountValue}
        </Card.Text>
      </Card.Body>
      {props.title == "Despesa" ? <Card.Link className='edit-amount' href="#" onClick={showExpenditureModal}><FaRegEdit /></Card.Link>
      : <Card.Link className='edit-amount' href="#" onClick={showRevenueModal}><FaRegEdit /></Card.Link>}
    </Card>
  );
}

export default TextExample;