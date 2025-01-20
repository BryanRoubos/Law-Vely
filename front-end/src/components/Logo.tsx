import logo from "../assets/logo-full.svg";
import { motion } from "framer-motion";

function Logo() {
   return (
     <div
       initial={{ opacity: 0, scale: 1.8 }}
       animate={{
         opacity: 1,
         scale: Math.min(0.2 + (window.innerWidth / 1440) * 0.2, 0.3), // Shrinks proportionally
       }}
       transition={{ duration: 0.5, ease: "easeInOut" }}
       whileHover={{ scale: 1.1, rotate: 5 }}
     >
       <img src={logo} alt="Law-Vely Logo" className="text-xl md:h-16" />
     </div>
   );
 }
 
 export default Logo;

// function Logo() {
//    return (
//    <div className="w-1/6 h-full flex items-center justify-center bg-purple-700">
//       <img 
//          src={logo} 
//          alt="Law-Vely Logo" 
//          className="h-10"/>
//    </div>
//    )
// }

// export default Logo;