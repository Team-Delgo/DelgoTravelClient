import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate ,useLocation} from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { tokenActions } from '../../redux/slice/tokenSlice';
import { scrollActions } from '../../redux/slice/scrollSlice';
import { tokenRefresh } from '../../common/api/login';
import Footer from '../../common/components/FooterNavigation';
import {RootState} from '../../redux/store'
import Folder from './wishListInfo/Folder';
import History from './historyInfo/History';
import './MyStoragePage.scss';


function MyStoragePage() {
  const location: any = useLocation();
  const [currentTab, setCurrentTab] = useState(0);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.token.token);
  const refreshToken = localStorage.getItem('refreshToken') || '';

  useEffect(() => {
    if (location.state?.prevPath.includes('/reservation-history')) {
      setCurrentTab(1);
    }
    if (location.state?.prevPath.includes('/review-writing')) {
      setCurrentTab(1);
    }
    if (location.state?.prevPath.includes('/detail-place')) {
      if (location.state?.myStorageTab !== null) {
        setCurrentTab(location.state?.myStorageTab);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);



  // useEffect(() => {
  //   tokenRefresh({ refreshToken }, (response: AxiosResponse) => {
  //     const { code } = response.data;

  //     if (code === 200) {
  //       const accessToken = response.headers.authorization_access;
  //       const refreshToken = response.headers.authorization_refresh;

  //       dispatch(tokenActions.setToken(accessToken),);
  //       localStorage.setItem('refreshToken', refreshToken);
  //     }
  //     else {
  //       navigation('/user/signin',{replace:true});
  //     }
  //   }, dispatch);
  // }, [accessToken]);

  const changeCurrentTab = useCallback((tabNumber: number) => (event: React.MouseEvent) => {
    dispatch(scrollActions.scrollInit())
    setCurrentTab(tabNumber);
  }, [])


  return (
    <>
      <div className="wish-list-background">
        {currentTab === 0 ? (
          <>
            <div className="wish-list-tab">
              <div
                className="wish-list-tab-folder-active"
                role="button"
                tabIndex={0}
                onClick={changeCurrentTab(0)}
                aria-hidden="true"
              >
                찜
              </div>
              <div
                className="wish-list-tab-history"
                role="button"
                tabIndex={-1}
                onClick={changeCurrentTab(1)}
                aria-hidden="true"
              >
                여행내역
              </div>
            </div>
            <Folder currentTab={currentTab} />
          </>
        ) : (
          <>
            <div className="wish-list-tab">
              <div
                className="wish-list-tab-folder"
                role="button"
                tabIndex={0}
                onClick={changeCurrentTab(0)}
                aria-hidden="true"
              >
                찜
              </div>
              <div
                className="wish-list-tab-history-active"
                role="button"
                tabIndex={-1}
                onClick={changeCurrentTab(1)}
                aria-hidden="true"
              >
                여행내역
              </div>
            </div>
            <History currentTab={currentTab}/>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyStoragePage;