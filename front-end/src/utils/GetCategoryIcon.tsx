import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faHome,
  faCar,
  faHeart,
  faLeaf,
  faBolt,
  faGraduationCap,
  faGavel,
  faHandshake,
  faShoppingCart,
  faLandmark,
  faMobileAlt,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Finance":
      return <FontAwesomeIcon icon={faCoins} className="text-yellow-300" />;
    case "Housing":
      return <FontAwesomeIcon icon={faHome} className="text-blue-300" />;
    case "Transportation":
      return <FontAwesomeIcon icon={faCar} className="text-red-400" />;
    case "Health":
      return <FontAwesomeIcon icon={faHeart} className="text-pink-400" />;
    case "Environment":
      return <FontAwesomeIcon icon={faLeaf} className="text-green-400" />;
    case "Energy":
      return <FontAwesomeIcon icon={faBolt} className="text-yellow-400" />;
    case "Education":
      return (
        <FontAwesomeIcon icon={faGraduationCap} className="text-indigo-400" />
      );
    case "Justice":
      return <FontAwesomeIcon icon={faGavel} className="text-gray-400" />;
    case "Trade":
      return <FontAwesomeIcon icon={faHandshake} className="text-cyan-400" />;
    case "Consumer":
      return (
        <FontAwesomeIcon icon={faShoppingCart} className="text-orange-400" />
      );
    case "Governance":
      return <FontAwesomeIcon icon={faLandmark} className="text-purple-400" />;
    case "Technology":
      return <FontAwesomeIcon icon={faMobileAlt} className="text-green-400" />;
    case "Animal Welfare":
      return <FontAwesomeIcon icon={faPaw} className="text-yellow-100" />;
    default:
      return null;
  }
};

export default getCategoryIcon;
