import { Link } from "react-router-dom"
import "./NavBar.css";

export default function NavBar({ onButtonClick }) {
   return (
      <nav>
         <ul>
            <li><Link to="/">Home</Link></li>
            <li onClick={onButtonClick} >Adicionar Item</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Alerta</Link></li>
         </ul>
      </nav>
   )
}
