import Navbar from './Components/NavBar/index.jsx';
import Home from './Pages/Home/home.jsx';
import RendaDespesas from './Pages/RendaDespesas/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/renda-despesas' element={<RendaDespesas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
