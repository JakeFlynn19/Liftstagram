import { login, logout } from "../../services/firebase";

const Header = (props) => (
    <header>
        <img src='https://t3.ftcdn.net/jpg/03/30/47/88/360_F_330478859_qqY6bmj9D93FwsLMFSlV7Pn1ZA4U8OHp.jpg' alt='logo'/>
    <h1>LIFTSTAGRAM</h1>
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