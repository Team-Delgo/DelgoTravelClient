import React, { useState, useCallback, useEffect } from 'react'
import { useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { scrollActions } from '../../redux/slice/scrollSlice';
import Footer from '../../common/components/FooterNavigation';
import {RootState} from '../../redux/store'
import Folder from './wishListInfo/Folder';
import History from './historyInfo/History';
import './MyStoragePage.scss';


function MyStoragePage() {
  const location: any = useLocation();
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken') || '';
  const refreshToken = localStorage.getItem('refreshToken') || '';

  useEffect(() => {
    if (location.state?.prevPath.includes('/reservation-history')) {
      setCurrentTab(1);
    }
    else if (location.state?.prevPath.includes('/review-writing')) {
      setCurrentTab(1);
    }
    else if (location.state?.prevPath.includes('/detail-place')) {
      if (location.state?.myStorageTab !== null) {
        setCurrentTab(location.state?.myStorageTab);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const changeCurrentTab = useCallback((tabNumber: number) => (event: React.MouseEvent) => {
    dispatch(scrollActions.scrollInit())
    setCurrentTab(tabNumber)
    // setTimeout(()=>{
    //   setCurrentTab(tabNumber);
    // },150);
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