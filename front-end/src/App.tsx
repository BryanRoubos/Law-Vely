import '../src/css/App.css';
// import { Routes, Route } from 'react-router-dom';
// import Footer from './components/Footer';
// import Header from './components/Header'
// import NavBar from './components/NavBar';
// import LegislationSection from './components/LegislationSection';
// import SingleLegislation from './components/SingleLegislation';

import SignIn from "./SignIn";

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col bg-blue-100">
//     <Header />
//     <div className="flex flex-1 flex-col md:flex-row">
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<LegislationSection />} />
//         <Route path="legislations/:legislation_id" element={<SingleLegislation />} />
//       </Routes>
//     </div>

//     <Footer />
//   </div>
//   )
// }


const App = () => {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <SignIn />
    </div>
  );
};

export default App;
