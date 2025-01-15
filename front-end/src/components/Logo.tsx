import logo from '../assets/law-vely-logo.png';

function Logo() {
   return (
   <div className="w-1/6 h-full flex items-center justify-center bg-purple-700">
      <img 
         src={logo} 
         alt="Law-Vely Logo" 
         className="h-10"/>
   </div>
   )
}

export default Logo;