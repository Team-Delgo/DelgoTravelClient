import React from 'react';
import { Link ,useLocation } from 'react-router-dom';
import { ReactComponent as Home } from '../../icons/home.svg';
import { ReactComponent as Search } from '../../icons/search.svg';
import { ReactComponent as Bag } from '../../icons/bag.svg';
import { ReactComponent as Person } from '../../icons/person.svg';
import { ReactComponent as HomeActive } from '../../icons/home-active.svg';
import { ReactComponent as SearchActive } from '../../icons/search-active.svg';
import { ReactComponent as BagActive } from '../../icons/bag-active.svg';
import { ReactComponent as PersonActive } from '../../icons/person-active.svg';
import {ROOT_PATH,WISH_LIST_PATH,WHERE_TO_GO,MY_ACCOUNT_PATH} from '../../constants/path.const'
import './Footer.scss';

function Footer() {
  const location = useLocation();
  return (
    <div className="footer">
      {location.pathname === ROOT_PATH ? (
        <Link to={ROOT_PATH }>
          <HomeActive className="homeIcon" />
        </Link>
      ) : (
        <Link to={ROOT_PATH }>
          <Home className="homeIcon" />
        </Link>
      )}
      {location.pathname === WHERE_TO_GO? (
        <Link to={WHERE_TO_GO}>
          <SearchActive className="searchIcon" />
        </Link>
      ) : (
        <Link to={WHERE_TO_GO}>
          <Search className="searchIcon" />
        </Link>
      )}
      {location.pathname === WISH_LIST_PATH ? (
        <Link to={WISH_LIST_PATH}>
          <BagActive className="bagIcon" />
        </Link>
      ) : (
        <Link to={WISH_LIST_PATH}>
          <Bag className="bagIcon" />
        </Link>
      )}
      {location.pathname === MY_ACCOUNT_PATH ? (
        <Link to={MY_ACCOUNT_PATH}>
          <PersonActive className="personIcon" />
        </Link>
      ) : (
        <Link to={MY_ACCOUNT_PATH}>
          <Person className="personIcon" />
        </Link>
      )}
    </div>
  );
}

export default Footer;
