import { NavLink, useMatch } from 'react-router-dom';

function Navbar() {
  const isActive = useMatch('/');

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" className={isActive ? 'active' : ''}>
            Translator
          </NavLink>
        </li>
        <li>
          <NavLink to="/image" className={useMatch('/image') ? 'active' : ''}>
            Image to Text
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
