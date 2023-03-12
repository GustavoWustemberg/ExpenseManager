import Card from 'react-bootstrap/Card';
import { FaRegEdit } from 'react-icons/fa';

function TextExample(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.amountValue}
        </Card.Text>
      </Card.Body>
      <Card.Link className='edit-amount' href="#"><FaRegEdit /></Card.Link>
    </Card>
  );
}

export default TextExample;