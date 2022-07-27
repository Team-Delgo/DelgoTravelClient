import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const [OS, setOS] = useState("android")
  const navigate = useNavigate();

  useEffect(() => {
    const varUA = navigator.userAgent.toLowerCase();
    if (varUA.indexOf('iphone') > -1 || varUA.indexOf('ipad') > -1 || varUA.indexOf('ipod') > -1) {
      setOS('ios');
    }
  }, []);

  const moveToTopScreen = useCallback(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  const moveToMyStoragePage = useCallback(() => {
    navigate(MY_STORAGE_PATH);
  }, []);

  const moveToMyAccountPage = useCallback(() => {
    navigate(MY_ACCOUNT_PATH.MAIN);
  }, []);

  return (
    <div className="footer">
      <div className={OS === "android" ? 'home-icon-android' : 'home-icon-ios'}>
        {location.pathname === ROOT_PATH ? (
          <div aria-hidden="true" onClick={moveToTopScreen}>
            <Link to={ROOT_PATH}>
              <HomeActive />
            </Link>
            <div className={OS === "android" ? "footer-text-active-android" : "footer-text-active-ios"}>홈</div>
          </div>
        ) : (
          <>
            <Link to={ROOT_PATH}>
              <Home />
            </Link>
            <div className={OS === "android" ? "footer-text-android" : "footer-text-ios"}>홈</div>
          </>
        )}
      </div>
      <div className={OS === "android" ? 'search-icon-android' : 'search-icon-ios'}>
        {location.pathname === WHERE_TO_GO_PATH ? (
          <div aria-hidden="true" onClick={moveToTopScreen}>
            <Link to={WHERE_TO_GO_PATH}>
              <SearchActive />
            </Link>
            <div className={OS === "android" ? "footer-text-active-android" : "footer-text-active-ios"}>찾기</div>
          </div>
        ) : (
          <>
            <Link to={WHERE_TO_GO_PATH}>
              <Search />
            </Link>
            <div className={OS === "android" ? "footer-text-android" : "footer-text-ios"}>찾기</div>
          </>
        )}
      </div>
      <div className={OS === "android" ? 'bag-icon-android' : 'bag-icon-ios'} aria-hidden="true" onClick={moveToMyStoragePage}>
        {location.pathname === MY_STORAGE_PATH ? (
          <div aria-hidden="true" onClick={moveToTopScreen}>
            <BagActive />
            <div className={OS === "android" ? "footer-text-active-android" : "footer-text-active-ios"}>내 여행</div>
          </div>
        ) : (
          <>
            <Bag />
            <div className={OS === "android" ? "footer-text-android" : "footer-text-ios"}>내 여행</div>
          </>
        )}
      </div>
      <div className={OS === "android" ? 'person-icon-android' : 'person-icon-ios'} aria-hidden="true" onClick={moveToMyAccountPage}>
        {location.pathname === MY_ACCOUNT_PATH.MAIN ? (
          <div aria-hidden="true" onClick={moveToTopScreen}>
            <PersonActive />
            <div className={OS === "android" ? "footer-text-active-android" : "footer-text-active-ios"}>내 정보</div>
          </div>
        ) : (
          <>
            <Person />
            <div className={OS === "android" ? "footer-text-android" : "footer-text-ios"}>내 정보</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Footer;
