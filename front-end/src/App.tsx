import '../src/css/App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header'
import NavBar from './components/NavBar';
import LegislationSection from './components/LegislationSection';
import SingleLegislation from './components/SingleLegislation';

function App() {
  return (
    <div id="App-1" className="bg-blue-100">
    <Header />
    <div id="App-2" className="flex justify-between items-stretch flex-col md:flex-row">
      <NavBar />
        <div id="App-3" className="m-1 flex w-full">
          <Routes>
            <Route path="/" element={<LegislationSection />} />
            <Route path="legislations/:legislation_id" element={<SingleLegislation />} />
          </Routes>
        </div>
    </div>

    <Footer />
  </div>
  )
}

export default App;
