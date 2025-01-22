import { Link } from "react-router-dom";
import logo from "../assets/logo-white-min-shadow.png";
// import { motion } from "framer-motion";

function Logo() {
  return (
    //  <motion.div
    //    initial={{ opacity: 0, scale: 1.8 }}
    //    animate={{
    //      opacity: 1,
    //      scale: 0.5 + (window.innerWidth / 1440) * 0.5,
    //    }}
    //    transition={{ duration: 0.4, ease: "easeInOut" }}
    //    whileHover={{ scale: 1.1, rotate: -3 }}
    //  >
    //    <img src={logo} alt="Law-Vely Logo" className="h-auto max-h-12 md:max-h-16 w-auto max-w-full mt-1" />
    //  </motion.div>
    <div>
      <Link to="/">
        <img
          src={logo}
          alt="Law-Vely Logo"
          className="h-auto max-h-8 md:max-h-12 w-auto max-w-full mt-1"
        />
      </Link>
    </div>
  );
}

export default Logo;
