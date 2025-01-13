import './App.css'
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header'
import LegislationSection from './components/LegislationSection';
import Logo from './components/Logo';
import NavBar from './components/NavBar';

function App() {

  return (
    <>
      <Logo />
      <Header />
      <NavBar />
      <Routes>
        <Route path='/' element={<LegislationSection />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
