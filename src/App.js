import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Capstone from './components/Pages/Capstone';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/capstone' element={<Capstone />} />
        </Routes>
        <ToastContainer limit={6} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
