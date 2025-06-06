import './css/App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import LegislationSection from "./components/LegislationSection";
import SingleLegislation from "./components/SingleLegislation";
import ProfilePage from "./components/ProfilePage";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NotFound from "./components/NotFound";
import UserPreferences from './components/UserPreferences';

function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/signin", "/signup", "/user-preferences"];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);
  const shouldHideNavBar = shouldHideHeader; 

  return (
 
  
    <div id="App-1" className="font-montserrat app-background-colour md:flex-row">
          {!shouldHideHeader && <Header />}
       
     
      <div
        id="App-2"
        className="flex justify-between items-stretch flex-col md:flex-row"
      >
        {!shouldHideNavBar && <NavBar />}

        <div id="App-3" className="mr-1 md:m-2 flex w-full min-h-screen">
          <Routes>
            <Route path="/" element={<LegislationSection />} />
            <Route
              path="legislations/:legislation_id"
              element={<SingleLegislation />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user-preferences" element={<UserPreferences />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
 
  );
}

export default App;
