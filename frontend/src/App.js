import Navbar from './Components/NavBar/index.jsx';
import Home from './Pages/Home/home.jsx';
import RendaDespesas from './Pages/RendaDespesas/index.jsx';
import HistoricoDespesas from './Pages/HistoricoDespesa/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link, Typography } from '@mui/material';

function App() {
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
          Expense Manager by{' '}
        <Link color="inherit" href="https://github.com/GustavoWustemberg">
          Gustavo Wustemberg
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/renda-despesas' element={<RendaDespesas />} />
          <Route path='/historico-despesas' element={<HistoricoDespesas />} />
        </Routes>
      </BrowserRouter>
      <Copyright sx={{ pt: 4 }} />
    </div>
  );
}

export default App;
