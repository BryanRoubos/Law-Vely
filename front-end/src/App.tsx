import './App.css'
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header'
import NavBar from './components/NavBar';
import Logo from './components/Logo';
import LegislationSection from './components/LegislationSection';
import SingleLegislation from './components/SingleLegislation';

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-blue-100">
      <div className="flex flex-1">
        <Logo />
        <Header />
      </div>
        <div className="flex flex-1">
          <NavBar />
          <LegislationSection />
        </div>
        <Routes>
          <Route path='/' element={<LegislationSection />} />
          <Route path='legislations/:legislation_id' element={<SingleLegislation />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App;
