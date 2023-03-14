import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function BasicExample() {
  function hadleLogout() {
    sessionStorage.clear();
    window.location.reload(true);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link to="/" className='navbar-brand'>Expense Manager</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className='nav-link'>Dashboard</Link>
            <Link to="/renda-despesas" className='nav-link'>Renda e Despesas</Link>
            <Link to="/historico-despesas" className='nav-link'>Histórico de despesas</Link>
          </Nav>
          <Nav>
            <Link to="/login" onClick={hadleLogout} className='btn btn-primary'>Sair</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;