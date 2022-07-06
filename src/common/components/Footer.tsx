import React, { useCallback,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Home } from '../../icons/home.svg';
import { ReactComponent as Search } from '../../icons/search.svg';
import { ReactComponent as Bag } from '../../icons/bag.svg';
import { ReactComponent as Person } from '../../icons/person.svg';
import { ReactComponent as HomeActive } from '../../icons/home-active.svg';
import { ReactComponent as SearchActive } from '../../icons/search-active.svg';
import { ReactComponent as BagActive } from '../../icons/bag-active.svg';
import { ReactComponent as PersonActive } from '../../icons/person-active.svg';
import { ROOT_PATH, MY_STORAGE_PATH, WHERE_TO_GO_PATH, MY_ACCOUNT_PATH } from '../../constants/path.const';
import './Footer.scss';

function Footer() {
  const location = useLocation();

  // useEffect(() => {
  //   const varUA = navigator.userAgent.toLowerCase();
  //   if (varUA.indexOf('android') > -1) {
  //     console.log('안드로이드')
  //   } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
  //     console.log('ios')
  //   } else {
  //     console.log('웹')
  //   }
  // }, [])

  const goToTopScreen = useCallback(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="footer">
      <div className="home-icon" aria-hidden="true" onClick={goToTopScreen}>
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
      <div className="search-icon" aria-hidden="true" onClick={goToTopScreen}>
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
        {location.pathname === MY_STORAGE_PATH ? (
          <>
            <Link to={MY_STORAGE_PATH}>
              <BagActive />
            </Link>
            <div className="footer-text-active">내 여행</div>
          </>
        ) : (
          <>
            <Link to={MY_STORAGE_PATH}>
              <Bag />
            </Link>
            <div className="footer-text">내 여행</div>
          </>
        )}
      </div>
      <div className="person-icon">
        {location.pathname === MY_ACCOUNT_PATH.MAIN ? (
          <>
            <Link to={MY_ACCOUNT_PATH.MAIN}>
              <PersonActive />
            </Link>
            <div className="footer-text-active">내 정보</div>
          </>
        ) : (
          <>
            <Link to={MY_ACCOUNT_PATH.MAIN}>
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
