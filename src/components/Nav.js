import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './styled';

const Nav = ({ darkMode, underBar }) => {
  return (
    <Navigation $underbar={underBar} $darkmode={darkMode}>
      <ul>
        <li>
          <Link to="/">
            <img src={darkMode ? 'img/home_dM.png' : 'img/home.png'} alt="홈" />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <img src={darkMode ? 'img/profile_dM.png' : 'img/profile.png'} alt="프로필" />
          </Link>
        </li>
      </ul>
    </Navigation>
  );
};

export default Nav;
