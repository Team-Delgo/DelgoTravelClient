import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Home } from '../../icons/home.svg';
import { ReactComponent as Search } from '../../icons/search.svg';
import { ReactComponent as Bag } from '../../icons/bag.svg';
import { ReactComponent as Person } from '../../icons/person.svg';

import { ReactComponent as HomeActive } from '../../icons/home-active.svg';
import { ReactComponent as SearchActive } from '../../icons/search-active.svg';
import { ReactComponent as BagActive } from '../../icons/bag-active.svg';
import { ReactComponent as PersonActive } from '../../icons/person-active.svg';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      {window.location.pathname === '/' ? (
        <Link to="/">
          <HomeActive className="homeIcon" />
        </Link>
      ) : (
        <Link to="/">
          <Home className="homeIcon" />
        </Link>
      )}
      {window.location.pathname === '/search' ? (
        <Link to="/search">
          <SearchActive className="searchIcon" />
        </Link>
      ) : (
        <Link to="/search">
          <Search className="searchIcon" />
        </Link>
      )}
      {window.location.pathname === '/wish-list' ? (
        <Link to="/wish-list">
          <BagActive className="bagIcon" />
        </Link>
      ) : (
        <Link to="/wish-list">
          <Bag className="bagIcon" />
        </Link>
      )}
      {window.location.pathname === "/my-account" ? (
        <Link to="/my-account">
          <PersonActive className="personIcon" />
        </Link>
      ) : (
        <Link to="/my-account">
          <Person className="personIcon" />
        </Link>
      )}
    </div>
  );
}

export default Footer;
