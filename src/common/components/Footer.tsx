import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Home } from '../../icons/home.svg';
import { ReactComponent as Search } from '../../icons/search.svg';
import { ReactComponent as Bag } from '../../icons/bag.svg';
import { ReactComponent as Person } from '../../icons/person.svg';
import { ReactComponent as HomeActive } from '../../icons/home-active.svg';
import { ReactComponent as SearchActive } from '../../icons/search-active.svg';
import { ReactComponent as BagActive } from '../../icons/bag-active.svg';
import { ReactComponent as PersonActive } from '../../icons/person-active.svg';
import { ROOT_PATH, WISH_LIST_PATH, WHERE_TO_GO_PATH, MY_ACCOUNT_PATH } from '../../constants/path.const';
import './Footer.scss';

function Footer() {
  const location = useLocation();
  return (
    <div className="footer">
      <div className="home-icon">
        {location.pathname === ROOT_PATH ? (
          <>
            <Link to={ROOT_PATH}>
              <HomeActive />
            </Link>
            <div className="footer-text-active">홈</div>
          </>
        ) : (
          <>
            <Link to={ROOT_PATH}>
              <Home />
            </Link>
            <div className="footer-text">홈</div>
          </>
        )}
      </div>
      <div className="search-icon">
        {location.pathname === WHERE_TO_GO_PATH ? (
          <>
            <Link to={WHERE_TO_GO_PATH}>
              <SearchActive />
            </Link>
            <div className="footer-text-active">찾기</div>
          </>
        ) : (
          <>
            <Link to={WHERE_TO_GO_PATH}>
              <Search />
            </Link>
            <div className="footer-text">찾기</div>
          </>
        )}
      </div>
      <div className="bag-icon">
        {location.pathname === WISH_LIST_PATH ? (
          <>
            <Link to={WISH_LIST_PATH}>
              <BagActive />
            </Link>
            <div className="footer-text-active">내 여행</div>
          </>
        ) : (
          <>
            <Link to={WISH_LIST_PATH}>
              <Bag />
            </Link>
            <div className="footer-text">내 여행</div>
          </>
        )}
      </div>
      <div className="person-icon">
        {location.pathname === MY_ACCOUNT_PATH ? (
          <>
            <Link to={MY_ACCOUNT_PATH}>
              <PersonActive />
            </Link>
            <div className="footer-text-active">내 정보</div>
          </>
        ) : (
          <>
            <Link to={MY_ACCOUNT_PATH}>
              <Person />
            </Link>
            <div className="footer-text">내 정보</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Footer;
