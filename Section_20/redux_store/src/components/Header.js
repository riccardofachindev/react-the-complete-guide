import { useSelector, useDispatch } from 'react-redux'

import classes from './Header.module.css';
import { authActions } from '../store/auth'

const Header = () => {
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector(state => state.auth.isAuthentificated);

  const logout = () => {
    dispatch(authActions.logout());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isUserLoggedIn && (
        <nav>
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
