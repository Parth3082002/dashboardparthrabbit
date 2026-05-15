import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackLink({ to, children = "Back" }) {
  return (
    <Link to={to} className="back-link">
      <FaArrowLeft /> {children}
    </Link>
  );
}

export default BackLink;
