import "./App.css";
import { Routes, Route } from "react-router-dom";
import Logo from "./components/Logo";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import LegislationSection from "./components/LegislationSection";
import Footer from "./components/Footer";
import SingleLegislation from "./components/SingleLegislation";

function App() {
  return (
    <>
      <Logo />
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<LegislationSection />} />
        <Route
          path="/legislations/:legislation_id"
          element={<SingleLegislation />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
