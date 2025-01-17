import '../src/css/App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import LegislationSection from './components/LegislationSection';
import SingleLegislation from './components/SingleLegislation';
import ProfilePage from './components/ProfilePage';
import Header from './components/Header'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SignIn from "./SignIn";
import SignUp from './SignUp';

function App() {

  const location = useLocation();

  const hideNavBarPaths = ["/signin", "/signup"];
  const shouldHideNavBar = hideNavBarPaths.includes(location.pathname)


  return (
    <div id="App-1" className="bg-blue-100">
    <Header />
    <div id="App-2" className="flex justify-between items-stretch flex-col md:flex-row">
      {!shouldHideNavBar && <NavBar />}

      <div id="App-3" className="mr-1 md:m-2 flex w-full">
        <Routes>
          <Route path="/" element={<LegislationSection />} />
          <Route path="legislations/:legislation_id" element={<SingleLegislation />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default App;
