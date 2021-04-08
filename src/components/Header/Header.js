import { login, logout } from "../../services/firebase";
import './Header.css';

const Header = (props) => (
  <header>
    <h1>Liftstagram</h1>
    <ul>
      {props.user ? (
        <>
          <li>Hello, {props.user.displayName}</li>
          <li>
            <img src={props.user.photoURL} alt={props.user.displayName} />
          </li>
          <li>My Profile</li>
          <li onClick={logout}>Logout</li>
        </>
      ) : (
        <li onClick={login}>Login</li>
      )}
    </ul>
  </header>
);

export default Header;