import { Link } from "react-router-dom"
import "./NavBar.css";

export default function NavBar({ onButtonClick }) {
   return (
      <nav>
         <ul>
            <li className="cursor-pointer"><Link to="/">Home</Link></li>
            <li onClick={onButtonClick}  className="cursor-pointer">Adicionar Item</li>
            <li className="cursor-pointer"><Link to="/">Home</Link></li>
            <li className="cursor-pointer"><Link to="/">Alerta</Link></li>
         </ul>
      </nav>
   )
}
